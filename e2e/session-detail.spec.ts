import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { backButton, favoriteButton, openSchedule, showSegment, sessionLink, visiblePage } from './helpers';

const detail = (page: Page) => visiblePage(page, 'session-detail-page');
const schedule = (page: Page) => visiblePage(page, 'schedule-page');

const toggleFavoriteFromDetail = async (page: Page, name: string) => {
  await showSegment(page, 'All');
  await sessionLink(page, name).click();
  await expect(detail(page).getByRole('heading', { level: 1 })).toHaveText(name);
  await favoriteButton(page).click();
  await backButton(page, 'session-detail-page').click();
  await showSegment(page, 'Favorites');
};

// Drags a session's item to the left to reveal its options.
const swipeOpen = async (page: Page, name: string) => {
  const item = sessionLink(page, name);
  await expect(item).toBeVisible();
  const box = (await item.boundingBox())!;
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width - 20, y);
  await page.mouse.down();
  await page.mouse.move(box.x + 40, y, { steps: 10 });
  await page.mouse.up();
};

const itemOption = (page: Page, name: string) =>
  schedule(page).getByRole('button', { name, exact: true }).filter({ visible: true });

test.describe('Session detail', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
  });

  test('shows the session title, track, time and location', async ({ page }) => {
    await sessionLink(page, 'Ionic Tooling').click();

    await expect(page).toHaveURL(/\/tabs\/schedule\/3$/);
    await expect(detail(page).getByRole('heading', { level: 1 })).toHaveText('Ionic Tooling');
    await expect(detail(page)).toContainText('Tooling');
    await expect(detail(page)).toContainText('9:45 am – 10:00 am');
    await expect(detail(page)).toContainText('Executive Ballroom');
    await expect(detail(page)).toContainText('we created Ionic');
  });

  test('favoriting from the detail page adds the session to Favorites', async ({ page }) => {
    await toggleFavoriteFromDetail(page, 'Ionic Tooling');

    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();
  });

  test('unfavoriting from the detail page removes the session from Favorites', async ({ page }) => {
    await toggleFavoriteFromDetail(page, 'Ionic Tooling');
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();

    await toggleFavoriteFromDetail(page, 'Ionic Tooling');

    await expect(sessionLink(page, 'Ionic Tooling')).toBeHidden();
    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
  });

  test('favoriting from the sliding item adds the session to Favorites', async ({ page }) => {
    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();

    await expect(page.getByText('Ionic Tooling was successfully added as a favorite.')).toBeVisible();

    await showSegment(page, 'Favorites');
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();
  });

  test('removing from Favorites with the sliding item unfavorites the session', async ({ page }) => {
    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();
    await showSegment(page, 'Favorites');

    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Remove').click();
    const alert = page.getByRole('alertdialog', { name: 'Remove Favorite' });
    await expect(alert).toContainText('Would you like to remove this session from your favorites?');
    await alert.getByRole('button', { name: 'Remove' }).click();

    await expect(sessionLink(page, 'Ionic Tooling')).toBeHidden();
    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
  });
});
