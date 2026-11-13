import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { backButton, openSchedule, visiblePage } from './helpers';

const speakerList = (page: Page) => visiblePage(page, 'speaker-list');
const speakerCard = (page: Page, name: string) =>
  speakerList(page)
    .locator('ion-card')
    .filter({ has: page.getByRole('heading', { name, exact: true }) });
const speakerDetail = (page: Page) => visiblePage(page, 'speaker-detail');

const openBurtBear = async (page: Page) => {
  await speakerCard(page, 'Burt Bear').getByRole('link', { name: 'About Burt Bear' }).click();
  await expect(speakerDetail(page).getByRole('heading', { name: 'Burt Bear' })).toBeVisible();
};

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
    await expect(detail.getByRole('button', { name: 'Contact', exact: true })).toBeVisible();
    await expect(detail.getByRole('button', { name: 'Share', exact: true })).toBeVisible();
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

  test('the back button on the speaker detail returns to the speaker list', async ({ page }) => {
    await speakerCard(page, 'Burt Bear').getByRole('link', { name: 'About Burt Bear' }).click();
    await expect(page).toHaveURL(/\/tabs\/speakers\/1$/);

    await backButton(page, 'speaker-detail').click();

    await expect(page).toHaveURL(/\/tabs\/speakers$/);
    await expect(visiblePage(page, 'speaker-detail')).toHaveCount(0);
    await expect(speakerList(page).locator('ion-card')).toHaveCount(13);
  });

  test('the Contact button opens the email and call options for the speaker', async ({ page }) => {
    await openBurtBear(page);

    await speakerDetail(page).getByRole('button', { name: 'Contact', exact: true }).click();

    const sheet = page.getByRole('dialog', { name: 'Contact Burt Bear' });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole('button')).toHaveText([
      'Email ( burt@example.com )',
      'Call ( +1-541-754-3010 )',
      'Cancel',
    ]);

    await sheet.getByRole('button', { name: 'Cancel' }).click();

    await expect(sheet).toBeHidden();
    await expect(page).toHaveURL(/\/tabs\/speakers\/1$/);
  });

  test('the contact options open the email and phone links', async ({ page }) => {
    await openBurtBear(page);
    // Record the links instead of leaving the app for the mail and phone apps.
    await page.evaluate(() => {
      const opened: string[] = [];
      (window as unknown as { opened: string[] }).opened = opened;
      window.open = (url) => {
        opened.push(String(url));
        return null;
      };
    });
    const sheet = page.getByRole('dialog', { name: 'Contact Burt Bear' });

    for (const option of ['Email ( burt@example.com )', 'Call ( +1-541-754-3010 )']) {
      await speakerDetail(page).getByRole('button', { name: 'Contact', exact: true }).click();
      await sheet.getByRole('button', { name: option }).click();
      await expect(sheet).toBeHidden();
    }

    expect(await page.evaluate(() => (window as unknown as { opened: string[] }).opened)).toEqual([
      'mailto:burt@example.com',
      'tel:+1-541-754-3010',
    ]);
  });

  test('the Share button opens the share options for the speaker', async ({ page }) => {
    await openBurtBear(page);

    await speakerDetail(page).getByRole('button', { name: 'Share', exact: true }).click();

    const sheet = page.getByRole('dialog', { name: 'Share Burt Bear' });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole('button')).toHaveText(['Copy Link', 'Share via ...', 'Cancel']);

    await sheet.getByRole('button', { name: 'Cancel' }).click();

    await expect(sheet).toBeHidden();
  });
});
