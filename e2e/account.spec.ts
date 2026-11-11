import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import {
  APP_LOAD_TIMEOUT,
  login,
  navigateFromMenu,
  openMenu,
  openSchedule,
  submitCredentials,
  visiblePage,
} from './helpers';

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

const openChangeUsername = async (page: Page) => {
  // Typing into the alert before it has finished opening can be lost, so wait for it to open.
  const opened = page.evaluate(
    () =>
      new Promise<void>((resolve) => document.addEventListener('ionAlertDidPresent', () => resolve(), { once: true })),
  );
  await visiblePage(page, 'account-page').getByText('Change Username').click();
  await opened;
  return page.getByRole('alertdialog', { name: 'Change Username' });
};

test.describe('Account', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
  });

  test('the menu starts logged out', async ({ page }) => {
    await expectLoggedOut(page);
  });

  test('logging in requires a password', async ({ page }) => {
    await navigateFromMenu(page, 'Login');
    const login = visiblePage(page, 'login-page');
    await login.getByRole('textbox', { name: 'Username' }).fill('ionitron');
    await login.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(login.getByText('Password is required')).toBeVisible();
    await expect(login.getByText('Username is required')).toHaveCount(0);
    await expectLoggedOut(page);
  });

  for (const fields of [
    { filled: 'Username', missing: 'Password' },
    { filled: 'Password', missing: 'Username' },
  ]) {
    test(`signing up requires a ${fields.missing.toLowerCase()}`, async ({ page }) => {
      await navigateFromMenu(page, 'Signup');
      const signup = visiblePage(page, 'signup-page');
      await signup.getByRole('textbox', { name: fields.filled }).fill('newbie');
      await signup.getByRole('button', { name: 'Create' }).click();

      await expect(page).toHaveURL(/\/signup$/);
      await expect(signup.getByText(`${fields.missing} is required`)).toBeVisible();
      await expect(signup.getByText(`${fields.filled} is required`)).toHaveCount(0);
      await expectLoggedOut(page);
    });
  }

  for (const form of [
    { menu: 'Login', pageId: 'login-page', button: 'Login' },
    { menu: 'Signup', pageId: 'signup-page', button: 'Create' },
  ]) {
    test(`${form.menu} shows the required messages when submitted empty`, async ({ page }) => {
      await navigateFromMenu(page, form.menu);
      const formPage = visiblePage(page, form.pageId);
      await expect(formPage.getByText('Username is required')).toBeHidden();

      await formPage.getByRole('button', { name: form.button }).click();

      await expect(formPage.getByText('Username is required')).toBeVisible();
      await expect(formPage.getByText('Password is required')).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`/${form.menu.toLowerCase()}$`));
    });

    test(`${form.menu} shows a required message when an empty field is left`, async ({ page }) => {
      await navigateFromMenu(page, form.menu);
      const formPage = visiblePage(page, form.pageId);
      const username = formPage.getByRole('textbox', { name: 'Username' });

      await username.focus();
      await username.blur();

      await expect(formPage.getByText('Username is required')).toBeVisible();
      await expect(formPage.getByText('Password is required')).toBeHidden();

      await username.fill('ionitron');
      await expect(formPage.getByText('Username is required')).toBeHidden();
    });
  }

  test('logging in marks the user as logged in', async ({ page }) => {
    await login(page, 'ionitron');

    await expectLoggedIn(page);
  });

  test('the Account page shows the username and can change it', async ({ page }) => {
    await login(page, 'ionitron');
    await navigateFromMenu(page, 'Account');

    const account = visiblePage(page, 'account-page');
    await expect(account.getByRole('heading', { name: 'ionitron' })).toBeVisible();

    const alert = await openChangeUsername(page);
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

  test('the Account page keeps the username when changing it is cancelled', async ({ page }) => {
    await login(page, 'ionitron');
    await navigateFromMenu(page, 'Account');
    const account = visiblePage(page, 'account-page');

    const alert = await openChangeUsername(page);
    await alert.getByRole('textbox', { name: 'username' }).fill('capacitor');
    await alert.getByRole('button', { name: 'Cancel' }).click();

    await expect(alert).toBeHidden();
    await expect(account.getByRole('heading', { name: 'ionitron' })).toBeVisible();
    await expect(account.getByRole('heading', { name: 'capacitor' })).toHaveCount(0);
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

  test('the Login page links to signup', async ({ page }) => {
    await navigateFromMenu(page, 'Login');
    await visiblePage(page, 'login-page').getByRole('button', { name: 'Signup' }).click();

    await expect(page).toHaveURL(/\/signup$/);
  });

  test('logging in survives a reload', async ({ page }) => {
    await login(page, 'ionitron');

    await page.reload();
    await expect(page.getByRole('button', { name: 'menu' })).toBeVisible({ timeout: APP_LOAD_TIMEOUT });

    await expectLoggedIn(page);
    await navigateFromMenu(page, 'Account');
    await expect(visiblePage(page, 'account-page').getByRole('heading', { name: 'ionitron' })).toBeVisible();
  });
});
