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

  test('the Support page sends a message and clears the form', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    const notice = page.getByText('This does not actually send a support request.');
    await expect(notice).toBeVisible();
    await expect(notice).toBeHidden({ timeout: 10_000 });

    const message = support.getByRole('textbox', { name: 'Enter your support message below' });
    await message.fill('The app is great!');
    await support.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Your support request has been sent.')).toBeVisible();
    await expect(message).toHaveValue('');
    await expect(page.getByText('Support message is required')).toBeHidden();
  });

  test('the support page shows the confirmation even while the notice is still open', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    const notice = page.getByText('This does not actually send a support request.');
    await expect(notice).toBeVisible();

    await support.getByRole('textbox', { name: 'Enter your support message below' }).fill('The app is great!');
    await support.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Your support request has been sent.')).toBeVisible();
    await expect(notice).toBeHidden();
  });

  test('the Support page does not send an empty message', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    await expect(support.getByText('Support message is required')).toBeHidden();

    await support.getByRole('button', { name: 'Submit' }).click();

    await expect(support.getByText('Support message is required')).toBeVisible();
    // The confirmation would show right away, so it not showing within a second means nothing was sent.
    await expect(page.getByText('Your support request has been sent.').waitFor({ timeout: 1000 })).rejects.toThrow();

    // Typing a message clears the error.
    await support.getByRole('textbox', { name: 'Enter your support message below' }).fill('Hello');
    await expect(support.getByText('Support message is required')).toBeHidden();
  });

  test('the support message shows its required message when left empty', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    const message = support.getByRole('textbox', { name: 'Enter your support message below' });

    await message.focus();
    await message.blur();

    await expect(support.getByText('Support message is required')).toBeVisible();
  });

  test('the support page asks before leaving with an unsent message', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    const support = visiblePage(page, 'support-page');
    const message = support.getByRole('textbox', { name: 'Enter your support message below' });
    await message.fill('Unsent message');

    await navigateFromMenu(page, 'Schedule');
    const alert = page.getByRole('alertdialog', { name: 'Leave this page?' });
    await expect(alert).toContainText(
      'Are you sure you want to leave this page? Your support message will not be submitted.',
    );
    await alert.getByRole('button', { name: 'Stay' }).click();

    await expect(alert).toBeHidden();
    await expect(page).toHaveURL(/\/support$/);
    await expect(message).toHaveValue('Unsent message');

    await navigateFromMenu(page, 'Schedule');
    await alert.getByRole('button', { name: 'Leave' }).click();

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(visibleTitle(page)).toHaveText('Schedule');

    // Once the page is left, other pages are left without asking.
    await navigateFromMenu(page, 'Speakers');
    await expect(page).toHaveURL(/\/tabs\/speakers$/);
    await expect(alert).toHaveCount(0);
  });

  test('the support page asks before showing the tutorial with an unsent message', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    await visiblePage(page, 'support-page')
      .getByRole('textbox', { name: 'Enter your support message below' })
      .fill('Unsent message');

    const menu = await openMenu(page);
    await menu.getByRole('button', { name: 'Show Tutorial' }).click();
    const alert = page.getByRole('alertdialog', { name: 'Leave this page?' });
    await alert.getByRole('button', { name: 'Leave' }).click();

    await expect(page).toHaveURL(/\/tutorial$/);
  });

  test('the Support page leaves without asking when the message is empty', async ({ page }) => {
    await navigateFromMenu(page, 'Support');
    // A message of only spaces has nothing to lose.
    await visiblePage(page, 'support-page')
      .getByRole('textbox', { name: 'Enter your support message below' })
      .fill('   ');

    await navigateFromMenu(page, 'Schedule');

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(visibleTitle(page)).toHaveText('Schedule');
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
  });

  test('the share button opens the social share buttons', async ({ page }) => {
    const schedule = visiblePage(page, 'schedule-page');
    await schedule.getByRole('button', { name: 'Share', exact: true }).click();
    for (const name of ['Instagram', 'Twitter', 'Facebook']) {
      await expect(schedule.getByRole('button', { name, exact: true })).toBeVisible();
    }
    await schedule.getByRole('button', { name: 'Vimeo', exact: true }).click();

    await expect(page.getByText('Posting to Vimeo')).toBeVisible();
  });

  test('the About page opens its options from the More options button', async ({ page }) => {
    await page.getByRole('tab', { name: 'About' }).click();
    await visiblePage(page, 'about-page').getByRole('button', { name: 'More options', exact: true }).click();

    await expect(page.getByText('Learn Ionic')).toBeVisible();
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
