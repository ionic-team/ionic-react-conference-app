import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

// The app renders nothing until it has fetched the conference data, which can be slow on CI runners.
export const APP_LOAD_TIMEOUT = 15_000;

/**
 * Opens the app for the first time and skips the tutorial, landing on the schedule.
 */
export const openSchedule = async (page: Page): Promise<void> => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Skip' }).click({ timeout: APP_LOAD_TIMEOUT });
  await expect(page).toHaveURL(/\/tabs\/schedule$/);
  await expect(sessionLink(page, 'Breakfast')).toBeVisible();
};

/**
 * Ionic keeps pages it has shown in the DOM and hides them, so scope to the page that is showing.
 */
export const visiblePage = (page: Page, id: string): Locator => page.locator(`#${id}:not(.ion-page-hidden)`);

export const visibleTitle = (page: Page): Locator => page.locator('ion-title').filter({ visible: true }).first();

// A session in the schedule list. Its accessible name starts with the session name, followed by its time and room.
export const sessionLink = (page: Page, name: string): Locator =>
  visiblePage(page, 'schedule-page').getByRole('link', { name: new RegExp(`^${escapeRegExp(name)} \\d`) });

// The schedule's toolbar buttons only show an icon and have no accessible name, so find them by position.
const scheduleEndButtons = (page: Page): Locator =>
  visiblePage(page, 'schedule-page').locator('ion-header ion-buttons[slot="end"] ion-button');
export const searchButton = (page: Page): Locator => scheduleEndButtons(page).first();
export const filterButton = (page: Page): Locator => scheduleEndButtons(page).last();

// The session detail's favorite button is the first icon-only button at the end of its toolbar.
export const favoriteButton = (page: Page): Locator =>
  visiblePage(page, 'session-detail-page').locator('ion-buttons[slot="end"] ion-button').first();

export const openMenu = async (page: Page): Promise<Locator> => {
  const menu = page.getByRole('navigation', { name: 'menu' });
  // Let the menu finish closing if a menu item was just tapped.
  await expect(menu).toBeHidden();
  // Right after a navigation the outgoing page's menu button can still be visible and then
  // disappear mid-click, so retry until the menu is open. Every menu button opens the same menu.
  await expect(async () => {
    if (!(await menu.isVisible())) {
      await page
        .getByRole('button', { name: 'menu', exact: true })
        .filter({ visible: true })
        .first()
        .click({ timeout: 1000 });
    }
    await expect(menu).toBeVisible({ timeout: 1000 });
  }).toPass();
  return menu;
};

export const navigateFromMenu = async (page: Page, name: string): Promise<void> => {
  const menu = await openMenu(page);
  await menu.getByRole('link', { name, exact: true }).click();
  await expect(menu).toBeHidden();
};

/**
 * Switches the schedule between its All and Favorites segments.
 */
export const showSegment = async (page: Page, name: 'All' | 'Favorites'): Promise<void> => {
  const schedule = visiblePage(page, 'schedule-page');
  // The segment button's host receives the pointer events, not its inner tab element.
  await schedule.locator('ion-segment-button', { hasText: name }).click();
  // Wait for the switch so the other segment's sessions aren't matched while they're still showing.
  await expect(schedule.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true');
};

export const backButton = (page: Page, pageId: string): Locator =>
  visiblePage(page, pageId).getByRole('button', { name: 'back', exact: true });

export const submitCredentials = async (
  page: Page,
  pageId: string,
  button: string,
  username: string,
): Promise<void> => {
  const form = visiblePage(page, pageId);
  await form.getByRole('textbox', { name: 'Username' }).fill(username);
  await form.getByRole('textbox', { name: 'Password' }).fill('secret');
  await form.getByRole('button', { name: button }).click();
  await expect(page).toHaveURL(/\/tabs\/schedule$/);
};

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
