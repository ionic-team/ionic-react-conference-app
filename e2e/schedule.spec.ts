import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import {
  backButton,
  favoriteButton,
  filterButton,
  isIos,
  openSchedule,
  openSearch,
  searchButton,
  showSegment,
  sessionLink,
  visiblePage,
} from './helpers';

const schedule = (page: Page) => visiblePage(page, 'schedule-page');
const timeGroups = (page: Page) => schedule(page).getByRole('group').filter({ visible: true });
const timeGroup = (page: Page, time: string) => timeGroups(page).filter({ has: page.getByText(time, { exact: true }) });
const visibleSessions = (page: Page) => schedule(page).getByRole('link').filter({ visible: true });
// The modal's dialog role is on an element in its shadow root, which doesn't contain the slotted content.
const filterModal = (page: Page) => page.locator('ion-modal');
// The checkbox's host element receives the pointer events, not its inner checkbox element.
const trackCheckbox = (page: Page, track: string) => filterModal(page).locator('ion-checkbox', { hasText: track });

test.describe('Schedule', () => {
  test.beforeEach(async ({ page }) => {
    await openSchedule(page);
  });

  test('lists the sessions grouped by time', async ({ page }) => {
    await expect(timeGroups(page)).toHaveCount(8);
    await expect(visibleSessions(page)).toHaveCount(20);

    // Groups are in time order, and so are the sessions within a group.
    await expect(timeGroups(page).first()).toContainText('8:00 am');
    await expect(timeGroups(page).last()).toContainText('3:00 pm');
    await expect(timeGroup(page, '9:15 am').getByRole('heading')).toHaveText([
      'University of Ionic',
      'Getting Started with Ionic',
      'Ionic Tooling',
    ]);
    await expect(sessionLink(page, 'Ionic Tooling')).toHaveAccessibleName(
      'Ionic Tooling 9:45 am — 10:00 am: Executive Ballroom',
    );
  });

  test('the icon-only buttons have accessible names', async ({ page }) => {
    if (await isIos(page)) {
      // iOS shows the searchbar instead of a Search button.
      await expect(searchButton(page)).toHaveCount(0);
      await expect(schedule(page).getByRole('searchbox')).toBeVisible();
    } else {
      await expect(searchButton(page)).toBeVisible();
    }
    await expect(filterButton(page)).toBeVisible();
    await expect(schedule(page).getByRole('button', { name: 'Share', exact: true })).toBeVisible();
  });

  test('search filters the sessions by name and clearing it restores them', async ({ page }) => {
    const searchbox = await openSearch(page);
    await searchbox.fill('react');

    await expect(visibleSessions(page)).toHaveCount(2);
    await expect(sessionLink(page, "What's New in React")).toBeVisible();
    await expect(sessionLink(page, 'Building with React and Ionic')).toBeVisible();
    await expect(timeGroups(page)).toHaveCount(2);

    await schedule(page).getByRole('button', { name: 'reset', exact: true }).click();

    await expect(searchbox).toHaveValue('');
    await expect(visibleSessions(page)).toHaveCount(20);
    await expect(timeGroups(page)).toHaveCount(8);
  });

  test('cancelling the search hides the searchbar and shows every session again', async ({ page }) => {
    test.skip(await isIos(page), 'iOS always shows the searchbar, without a cancel button.');
    await searchButton(page).click();
    const searchbar = schedule(page).locator('ion-searchbar').filter({ visible: true });
    await schedule(page).getByRole('searchbox').fill('react');
    await expect(visibleSessions(page)).toHaveCount(2);

    await searchbar.getByRole('button', { name: 'cancel' }).click();

    await expect(searchbar).toHaveCount(0);
    await expect(visibleSessions(page)).toHaveCount(20);
  });

  test('search shows an empty state when no session matches', async ({ page }) => {
    await (await openSearch(page)).fill('no such session');

    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
    await expect(visibleSessions(page)).toHaveCount(0);
  });

  test('Favorites shows an empty state when nothing is favorited', async ({ page }) => {
    await showSegment(page, 'Favorites');

    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
    await expect(visibleSessions(page)).toHaveCount(0);
  });

  test('Favorites shows only the favorited sessions', async ({ page }) => {
    await sessionLink(page, 'Ionic Tooling').click();
    await favoriteButton(page).click();
    await backButton(page, 'session-detail-page').click();

    await showSegment(page, 'Favorites');

    await expect(visibleSessions(page)).toHaveCount(1);
    await expect(sessionLink(page, 'Ionic Tooling')).toBeVisible();
    await expect(timeGroups(page)).toHaveCount(1);
    await expect(timeGroups(page)).toContainText('9:15 am');

    await showSegment(page, 'All');
    await expect(visibleSessions(page)).toHaveCount(20);
  });

  test('the filter excludes a track and including it brings its sessions back', async ({ page }) => {
    await filterButton(page).click();
    await trackCheckbox(page, 'Food').click();
    await expect(filterModal(page).getByRole('checkbox', { name: 'Food' })).not.toBeChecked();
    await filterModal(page).getByRole('button', { name: 'Done' }).click();
    await expect(filterModal(page)).toBeHidden();

    await expect(sessionLink(page, 'Breakfast')).toBeHidden();
    await expect(sessionLink(page, 'Lunch')).toBeHidden();
    await expect(visibleSessions(page)).toHaveCount(18);
    // The time groups that only had Food sessions are gone too.
    await expect(timeGroups(page)).toHaveCount(6);

    await filterButton(page).click();
    await trackCheckbox(page, 'Food').click();
    await expect(filterModal(page).getByRole('checkbox', { name: 'Food' })).toBeChecked();
    await filterModal(page).getByRole('button', { name: 'Done' }).click();

    await expect(sessionLink(page, 'Breakfast')).toBeVisible();
    await expect(sessionLink(page, 'Lunch')).toBeVisible();
    await expect(visibleSessions(page)).toHaveCount(20);
  });

  test('Reset in the filter deselects every track', async ({ page }) => {
    test.skip(await isIos(page), 'iOS shows Cancel instead of Reset.');
    await filterButton(page).click();
    await filterModal(page).getByRole('button', { name: 'Reset' }).click();

    await expect(filterModal(page).getByRole('checkbox', { checked: true })).toHaveCount(0);
    await expect(filterModal(page).getByRole('checkbox', { checked: false })).toHaveCount(10);

    await trackCheckbox(page, 'Workshop').click();
    await filterModal(page).getByRole('button', { name: 'Done' }).click();

    await expect(visibleSessions(page)).toHaveCount(1);
    await expect(sessionLink(page, 'Ionic Workshop')).toBeVisible();
  });

  test('the filter toolbar buttons keep their casing', async ({ page }) => {
    test.skip(await isIos(page), 'iOS does not uppercase toolbar buttons.');
    await filterButton(page).click();

    // Not Android's uppercase.
    for (const name of ['Deselect All', 'Select All']) {
      await expect(filterModal(page).getByRole('button', { name, exact: true })).toHaveCSS(
        'text-transform',
        'capitalize',
      );
    }
  });

  test('Cancel in the filter closes it without applying the changes', async ({ page }) => {
    test.skip(!(await isIos(page)), 'md shows Reset instead of Cancel.');
    await filterButton(page).click();
    await trackCheckbox(page, 'Food').click();
    await filterModal(page).getByRole('button', { name: 'Done' }).click();
    await expect(filterModal(page)).toBeHidden();
    await expect(visibleSessions(page)).toHaveCount(18);

    await filterButton(page).click();
    await trackCheckbox(page, 'React').click();
    await expect(filterModal(page).getByRole('checkbox', { name: 'React' })).not.toBeChecked();
    await filterModal(page).getByRole('button', { name: 'Cancel' }).click();
    await expect(filterModal(page)).toBeHidden();

    // Only the change made with Done is kept.
    await expect(visibleSessions(page)).toHaveCount(18);
    await expect(sessionLink(page, 'Breakfast')).toBeHidden();
    await expect(sessionLink(page, "What's New in React")).toBeVisible();

    await filterButton(page).click();
    await expect(filterModal(page).getByRole('checkbox', { name: 'Food' })).not.toBeChecked();
    await expect(filterModal(page).getByRole('checkbox', { name: 'React' })).toBeChecked();
  });

  test('Deselect All hides every session and Select All brings them back', async ({ page }) => {
    await filterButton(page).click();
    await filterModal(page).getByRole('button', { name: 'Deselect All', exact: true }).click();
    await expect(filterModal(page).getByRole('checkbox', { checked: true })).toHaveCount(0);
    await filterModal(page).getByRole('button', { name: 'Done' }).click();
    await expect(filterModal(page)).toBeHidden();

    await expect(schedule(page).getByText('No Sessions Found')).toBeVisible();
    await expect(visibleSessions(page)).toHaveCount(0);

    await filterButton(page).click();
    await filterModal(page).getByRole('button', { name: 'Select All', exact: true }).click();
    await expect(filterModal(page).getByRole('checkbox', { checked: false })).toHaveCount(0);
    await expect(filterModal(page).getByRole('checkbox', { checked: true })).toHaveCount(10);
    await filterModal(page).getByRole('button', { name: 'Done' }).click();
    await expect(filterModal(page)).toBeHidden();

    await expect(visibleSessions(page)).toHaveCount(20);
    await expect(timeGroups(page)).toHaveCount(8);
  });

  test('search and the track filter combine', async ({ page }) => {
    // The filter button is hidden while searching, so filter first.
    await filterButton(page).click();
    await filterModal(page).getByRole('button', { name: 'Deselect All', exact: true }).click();
    await trackCheckbox(page, 'React').click();
    await filterModal(page).getByRole('button', { name: 'Done' }).click();
    await expect(filterModal(page)).toBeHidden();
    await expect(visibleSessions(page)).toHaveCount(2);

    await (await openSearch(page)).fill('ionic');

    // Only the session that matches both the search and the track is left.
    await expect(visibleSessions(page)).toHaveCount(1);
    await expect(sessionLink(page, 'Building with React and Ionic')).toBeVisible();

    await schedule(page).getByRole('button', { name: 'reset', exact: true }).click();

    // Clearing the search keeps the track filter.
    await expect(visibleSessions(page)).toHaveCount(2);
    await expect(sessionLink(page, "What's New in React")).toBeVisible();
  });
});
