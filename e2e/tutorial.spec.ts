import { expect, test } from '@playwright/test';

import { APP_LOAD_TIMEOUT, openMenu, sessionLink, visiblePage } from './helpers';

test.describe('Tutorial', () => {
  test('shows the tutorial on the first visit', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/tutorial$/, { timeout: APP_LOAD_TIMEOUT });
    await expect(page.getByRole('heading', { name: 'Welcome to ICA' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
  });

  test('skipping the tutorial opens the schedule', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Skip' }).click({ timeout: APP_LOAD_TIMEOUT });

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(sessionLink(page, 'Breakfast')).toBeVisible();
  });

  test('finishing the slides with Continue opens the schedule', async ({ page }) => {
    await page.goto('/');
    const tutorial = visiblePage(page, 'tutorial-page');

    // Swipe through each slide by scrolling it into view.
    for (const title of ['Welcome to ICA', 'What is Ionic?', 'What is Ionic Appflow?', 'Ready to Play?']) {
      const heading = tutorial.getByRole('heading', { name: title });
      await heading.scrollIntoViewIfNeeded({ timeout: APP_LOAD_TIMEOUT });
      await expect(heading).toBeInViewport();
    }
    await tutorial.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/tabs\/schedule$/);
    await expect(sessionLink(page, 'Breakfast')).toBeVisible();
  });

  test('does not show the tutorial again after it is completed', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Skip' }).click({ timeout: APP_LOAD_TIMEOUT });
    await expect(page).toHaveURL(/\/tabs\/schedule$/);

    await page.goto('/');

    await expect(page).toHaveURL(/\/tabs\/schedule$/, { timeout: APP_LOAD_TIMEOUT });
    await expect(sessionLink(page, 'Breakfast')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeHidden();
  });

  test('can be shown again from the menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Skip' }).click({ timeout: APP_LOAD_TIMEOUT });
    await expect(page).toHaveURL(/\/tabs\/schedule$/);

    const menu = await openMenu(page);
    await menu.getByRole('button', { name: 'Show Tutorial' }).click();

    await expect(page).toHaveURL(/\/tutorial$/);
    await expect(page.getByRole('heading', { name: 'Welcome to ICA' })).toBeVisible();
  });
});
