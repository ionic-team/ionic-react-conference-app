import { expect, test } from '@playwright/test';

import { login, navigateFromMenu, openMenu, openSchedule, visiblePage, visibleTitle } from './helpers';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
  });

  test('the tab bar reaches each tab', async ({ page }) => {
    for (const tab of [
      { name: 'Speakers', url: /\/tabs\/speakers$/, title: 'Speakers' },
      { name: 'Map', url: /\/tabs\/map$/, title: 'Map' },
      { name: 'Schedule', url: /\/tabs\/schedule$/, title: 'Schedule' },
    ]) {
      await page.getByRole('tab', { name: tab.name }).click();

      await expect(page).toHaveURL(tab.url);
      await expect(visibleTitle(page)).toHaveText(tab.title);
      await expect(page.getByRole('tab', { name: tab.name })).toHaveAttribute('aria-selected', 'true');
    }

    // The About page has no title in its toolbar, just an About heading.
    await page.getByRole('tab', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/tabs\/about$/);
    await expect(visiblePage(page, 'about-page').getByRole('heading', { name: 'About' })).toBeVisible();
  });

  for (const item of [
    { name: 'Speakers', url: /\/tabs\/speakers$/, title: 'Speakers' },
    { name: 'Map', url: /\/tabs\/map$/, title: 'Map' },
    { name: 'Support', url: /\/support$/, title: 'Support' },
    { name: 'Login', url: /\/login$/, title: 'Login' },
    { name: 'Signup', url: /\/signup$/, title: 'Signup' },
    { name: 'Schedule', url: /\/tabs\/schedule$/, title: 'Schedule' },
  ]) {
    test(`the menu opens the ${item.name} page`, async ({ page }) => {
      // Start somewhere else so that opening Schedule is a navigation too.
      if (item.name === 'Schedule') {
        await navigateFromMenu(page, 'Speakers');
        await expect(page).toHaveURL(/\/tabs\/speakers$/);
      }

      await navigateFromMenu(page, item.name);

      await expect(page).toHaveURL(item.url);
      await expect(visibleTitle(page)).toHaveText(item.title);
    });
  }

  test('the menu opens the About page', async ({ page }) => {
    await navigateFromMenu(page, 'About');

    await expect(page).toHaveURL(/\/tabs\/about$/);
    await expect(visiblePage(page, 'about-page')).toContainText('The Ionic Conference is a one-day event');
  });

  test('the About page shows the conference date and location', async ({ page }) => {
    await page.getByRole('tab', { name: 'About' }).click();

    const about = visiblePage(page, 'about-page');
    await expect(about).toContainText('a one-day event happening on May 17, 2047');
    await expect(about.locator('ion-item').filter({ hasText: 'Date' })).toContainText('May 17, 2047');
    await expect(about.getByRole('button', { name: 'Location, Madison, WI' })).toBeVisible();
    await expect(about).toContainText('ica2047');
  });

  test('the map page shows a marker for each location', async ({ page }) => {
    // Keep the test independent of the network by not loading the map tiles.
    await page.route(/tile\.openstreetmap\.org/, (route) => route.abort());

    await page.getByRole('tab', { name: 'Map' }).click();

    const map = page.locator('.map-canvas');
    await expect(map).toHaveClass(/leaflet-container/);
    await expect(map).toHaveClass(/show-map/);
    await expect(map.locator('.leaflet-marker-icon')).toHaveCount(4);
  });

  test('the support page sends a message and clears the form', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    const notice = page.getByText('This does not actually send a support request.');
    await expect(notice).toBeVisible();
    // The page can only show one toast at a time and skips the confirmation while the notice is open (see the report).
    await expect(notice).toBeHidden({ timeout: 10_000 });

    const message = support.getByRole('textbox', { name: 'Enter your support message below' });
    await message.fill('The app is great!');
    await support.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Your support request has been sent.')).toBeVisible();
    await expect(message).toHaveValue('');
    await expect(page.getByText('Support message is required')).toBeHidden();
  });

  test('the support page does not send an empty message', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');

    await support.getByRole('button', { name: 'Submit' }).click();

    // The "Support message is required" error text isn't shown (see the report), so check nothing was sent.
    await expect(support.getByRole('textbox', { name: 'Enter your support message below' })).toBeVisible();
    await expect(page.getByText('Your support request has been sent.')).toHaveCount(0);
  });

  test('the dark mode toggle switches the dark palette', async ({ page }) => {
    const app = page.locator('ion-app');
    await expect(app).not.toHaveClass(/ion-palette-dark/);

    const menu = await openMenu(page);
    const toggle = menu.getByRole('switch', { name: 'Dark Mode' });
    // The toggle's host element receives the pointer events, not its inner switch element.
    const toggleHost = menu.locator('ion-toggle');
    await toggleHost.click();

    await expect(toggle).toBeChecked();
    await expect(app).toHaveClass(/ion-palette-dark/);

    await toggleHost.click();

    await expect(toggle).not.toBeChecked();
    await expect(app).not.toHaveClass(/ion-palette-dark/);
  });

  test('the dark mode toggle is in the menu while logged in', async ({ page }) => {
    await login(page, 'ionitron');

    const menu = await openMenu(page);
    await expect(menu.getByRole('link', { name: 'Logout', exact: true })).toBeVisible();
    const toggle = menu.getByRole('switch', { name: 'Dark Mode' });
    await expect(toggle).toBeVisible();
    await menu.locator('ion-toggle').click();

    await expect(toggle).toBeChecked();
    await expect(page.locator('ion-app')).toHaveClass(/ion-palette-dark/);
  });
});
