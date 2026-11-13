import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { APP_LOAD_TIMEOUT, openMenu, sessionLink, visiblePage } from './helpers';

// Drags from the left edge of the screen, which opens the menu when it is enabled.
const swipeFromEdge = async (page: Page) => {
  const y = page.viewportSize()!.height / 2;
  await page.mouse.move(5, y);
  await page.mouse.down();
  await page.mouse.move(250, y, { steps: 10 });
  await page.mouse.up();
};

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

  test('the menu is disabled on the tutorial and works again after skipping it', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Skip' }).click({ timeout: APP_LOAD_TIMEOUT });
    const menu = await openMenu(page);
    await menu.getByRole('button', { name: 'Show Tutorial' }).click();
    await expect(page).toHaveURL(/\/tutorial$/);
    await expect(menu).toBeHidden();

    const menuElement = page.locator('ion-menu');
    await expect(menuElement).not.toHaveClass(/menu-enabled/);
    await expect(page.getByRole('button', { name: 'menu', exact: true }).filter({ visible: true })).toHaveCount(0);
    await swipeFromEdge(page);
    await expect(menu).toBeHidden();

    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page).toHaveURL(/\/tabs\/schedule$/);

    await expect(menuElement).toHaveClass(/menu-enabled/);
    await swipeFromEdge(page);
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Speakers', exact: true })).toBeVisible();
  });
});
