import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { APP_LOAD_TIMEOUT, navigateFromMenu, openMenu, openSchedule, submitCredentials, visiblePage } from './helpers';

const expectMenuLinks = async (page: Page, shown: string[], hidden: string[]) => {
  const menu = await openMenu(page);
  for (const name of shown) {
    await expect(menu.getByRole('link', { name, exact: true })).toBeVisible();
  }
  for (const name of hidden) {
    await expect(menu.getByRole('link', { name, exact: true })).toHaveCount(0);
  }
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
};

const expectLoggedIn = (page: Page) => expectMenuLinks(page, ['Account', 'Support', 'Logout'], ['Login', 'Signup']);
const expectLoggedOut = (page: Page) => expectMenuLinks(page, ['Login', 'Support', 'Signup'], ['Account', 'Logout']);

const login = async (page: Page, username: string) => {
  await navigateFromMenu(page, 'Login');
  await submitCredentials(page, 'login-page', 'Login', username);
};

test.describe('Account', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
  });

  test('starts logged out', async ({ page }) => {
    await expectLoggedOut(page);
  });

  test('does not log in without a username and password', async ({ page }) => {
    await navigateFromMenu(page, 'Login');
    const login = visiblePage(page, 'login-page');
    await login.getByRole('textbox', { name: 'Username' }).fill('ionitron');
    await login.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expectLoggedOut(page);
  });

  test('logging in marks the user as logged in', async ({ page }) => {
    await login(page, 'ionitron');

    await expectLoggedIn(page);
  });

  test('the account page shows the username and can change it', async ({ page }) => {
    await login(page, 'ionitron');
    await navigateFromMenu(page, 'Account');

    const account = visiblePage(page, 'account-page');
    await expect(account.getByRole('heading', { name: 'ionitron' })).toBeVisible();

    // Typing into the alert before it has finished opening can be lost, so wait for it to open.
    const opened = page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          document.addEventListener('ionAlertDidPresent', () => resolve(), { once: true }),
        ),
    );
    await account.getByText('Change Username').click();
    await opened;
    const alert = page.getByRole('alertdialog', { name: 'Change Username' });
    const input = alert.getByRole('textbox', { name: 'username' });
    await expect(input).toHaveValue('ionitron');
    await input.fill('capacitor');
    await alert.getByRole('button', { name: 'Ok' }).click();

    await expect(account.getByRole('heading', { name: 'capacitor' })).toBeVisible();

    // The new username is saved.
    await page.reload();
    await expect(visiblePage(page, 'account-page').getByRole('heading', { name: 'capacitor' })).toBeVisible({
      timeout: APP_LOAD_TIMEOUT,
    });
  });

  test('logging out returns to the logged out state', async ({ page }) => {
    await login(page, 'ionitron');

    await navigateFromMenu(page, 'Logout');

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expectLoggedOut(page);

    // Logging out is saved too.
    await page.reload();
    await expect(page.getByRole('button', { name: 'menu' })).toBeVisible({ timeout: APP_LOAD_TIMEOUT });
    await expectLoggedOut(page);
  });

  test('signing up logs the user in', async ({ page }) => {
    await navigateFromMenu(page, 'Signup');
    await submitCredentials(page, 'signup-page', 'Create', 'newbie');

    await expectLoggedIn(page);
    await navigateFromMenu(page, 'Account');
    await expect(visiblePage(page, 'account-page').getByRole('heading', { name: 'newbie' })).toBeVisible();
  });

  test('the login page links to signup', async ({ page }) => {
    await navigateFromMenu(page, 'Login');
    await visiblePage(page, 'login-page').getByRole('button', { name: 'Signup' }).click();

    await expect(page).toHaveURL(/\/signup$/);
  });

  test('stays logged in after a reload', async ({ page }) => {
    await login(page, 'ionitron');

    await page.reload();
    await expect(page.getByRole('button', { name: 'menu' })).toBeVisible({ timeout: APP_LOAD_TIMEOUT });

    await expectLoggedIn(page);
    await navigateFromMenu(page, 'Account');
    await expect(visiblePage(page, 'account-page').getByRole('heading', { name: 'ionitron' })).toBeVisible();
  });
});
