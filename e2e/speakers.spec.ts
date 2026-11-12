import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { backButton, openSchedule, visiblePage } from './helpers';

const speakerList = (page: Page) => visiblePage(page, 'speaker-list');
const speakerCard = (page: Page, name: string) =>
  speakerList(page)
    .locator('ion-card')
    .filter({ has: page.getByRole('heading', { name, exact: true }) });

test.describe('Speakers', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
    await page.getByRole('tab', { name: 'Speakers' }).click();
    await expect(page).toHaveURL(/\/tabs\/speakers$/);
  });

  test('lists the speakers with their sessions', async ({ page }) => {
    await expect(speakerList(page).locator('ion-card')).toHaveCount(13);

    const burt = speakerCard(page, 'Burt Bear');
    await expect(burt).toContainText('Software Engineer');
    await expect(burt.getByRole('link', { name: 'The Ionic Package' })).toBeVisible();
    await expect(burt.getByRole('link', { name: 'Push Notifications in Ionic' })).toBeVisible();
  });

  test('opens the speaker detail', async ({ page }) => {
    await speakerCard(page, 'Burt Bear').getByRole('link', { name: 'About Burt Bear' }).click();

    await expect(page).toHaveURL(/\/tabs\/speakers\/1$/);
    const detail = visiblePage(page, 'speaker-detail');
    await expect(detail.getByRole('heading', { name: 'Burt Bear' })).toBeVisible();
    await expect(detail).toContainText('Burt is a Bear.');
  });

  test('opens a session from its speaker card', async ({ page }) => {
    await speakerCard(page, 'Burt Bear').getByRole('link', { name: 'The Ionic Package' }).click();

    await expect(page).toHaveURL(/\/tabs\/speakers\/sessions\/15$/);
    const detail = visiblePage(page, 'session-detail-page');
    await expect(detail.getByRole('heading', { level: 1 })).toHaveText('The Ionic Package');
    await expect(detail).toContainText('1:30 pm – 2:00 pm');
    await expect(detail).toContainText('Grand Ballroom B');

    await backButton(page, 'session-detail-page').click();
    await expect(page).toHaveURL(/\/tabs\/speakers$/);
  });
});
