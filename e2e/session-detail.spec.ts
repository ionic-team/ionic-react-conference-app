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
  // Wait for an item that was just closed to finish closing, or the swipe is lost.
  await expect(schedule(page).locator('ion-item-sliding.item-sliding-active-slide')).toHaveCount(0);
  const box = (await item.boundingBox())!;
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width - 20, y);
  await page.mouse.down();
  await page.mouse.move(box.x + 40, y, { steps: 10 });
  await page.mouse.up();
};

const visibleSessions = (page: Page) => schedule(page).getByRole('link').filter({ visible: true });

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
    await expect(detail(page).locator('.session-track-tooling')).toHaveText('Tooling');
    await expect(detail(page)).toContainText('9:45 am – 10:00 am');
    await expect(detail(page)).toContainText('Executive Ballroom');
    await expect(detail(page)).toContainText('we created Ionic');
  });

  test('opens a session from a direct link', async ({ page }) => {
    await page.goto('/tabs/schedule/7');

    await expect(detail(page).getByRole('heading', { level: 1 })).toHaveText('The Evolution of Ionicons');
    await expect(detail(page).locator('.session-track-design')).toHaveText('Design');
    await expect(detail(page)).toContainText('10:15 am – 10:30 am');
    await expect(detail(page)).toContainText('Hall 2');

    // There is no earlier page to go back to, so the back button opens the schedule.
    await backButton(page, 'session-detail-page').click();

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();
  });

  test('unfavoriting from the detail page removes the session from Favorites', async ({ page }) => {
    await toggleFavoriteFromDetail(page, 'Ionic Tooling');
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();

    await toggleFavoriteFromDetail(page, 'Ionic Tooling');

    await expect(sessionLink(page, 'Ionic Tooling')).toBeHidden();
    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
  });

  test('unfavoriting a session opened from Favorites removes it from the list', async ({ page }) => {
    await toggleFavoriteFromDetail(page, 'Ionic Tooling');

    await sessionLink(page, 'Ionic Tooling').click();
    await favoriteButton(page).click();
    await backButton(page, 'session-detail-page').click();

    await expect(schedule(page).getByRole('tab', { name: 'Favorites' })).toHaveAttribute('aria-selected', 'true');
    await expect(sessionLink(page, 'Ionic Tooling')).toBeHidden();
    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
  });

  test('the back button returns to the schedule', async ({ page }) => {
    await sessionLink(page, 'Ionic Tooling').click();
    await expect(page).toHaveURL(/\/tabs\/schedule\/3$/);

    await backButton(page, 'session-detail-page').click();

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(visiblePage(page, 'session-detail-page')).toHaveCount(0);
    await expect(visibleSessions(page)).toHaveCount(20);
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

  test('favoriting a session that is already a favorite asks to remove it, and Cancel keeps it', async ({ page }) => {
    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();
    await expect(page.getByText('Ionic Tooling was successfully added as a favorite.')).toBeVisible();

    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();
    const alert = page.getByRole('alertdialog', { name: 'Favorite already added' });
    await alert.getByRole('button', { name: 'Cancel' }).click();
    await expect(alert).toBeHidden();

    await showSegment(page, 'Favorites');
    await expect(visibleSessions(page)).toHaveCount(1);
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();
  });

  test('Remove in the already-a-favorite prompt unfavorites the session', async ({ page }) => {
    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();

    await swipeOpen(page, 'Ionic Tooling');
    await itemOption(page, 'Favorite').click();
    await page
      .getByRole('alertdialog', { name: 'Favorite already added' })
      .getByRole('button', { name: 'Remove' })
      .click();

    await showSegment(page, 'Favorites');
    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
  });
});
