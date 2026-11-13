import { IonRouterContext, NavContext } from '@ionic/react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { useContext, useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { ConfirmLeave } from '../data/LeaveGuardContext';
import { useLeaveGuard } from '../data/LeaveGuardContext';
import { LeaveGuardProvider } from '../data/LeaveGuardProvider';
import { makeState } from '../testing/fixtures';
import { renderWithState } from '../testing/render';

import Menu from './Menu';

// Stands in for a page that asks before it is left.
const AskBeforeLeaving = ({ confirm }: { confirm: ConfirmLeave }) => {
  const { registerConfirmLeave } = useLeaveGuard();
  useEffect(() => registerConfirmLeave(confirm), [confirm, registerConfirmLeave]);
  return null;
};

// Records the navigations of the menu's links and of the router.
const RecordNavigation = ({
  navigate,
  push,
  children,
}: PropsWithChildren<{ navigate: () => void; push: () => void }>) => {
  const nav = useContext(NavContext);
  const router = useContext(IonRouterContext);
  return (
    <NavContext.Provider value={{ ...nav, navigate }}>
      <IonRouterContext.Provider value={{ ...router, push }}>{children}</IonRouterContext.Provider>
    </NavContext.Provider>
  );
};

const renderAskingMenu = (url: string) => {
  const confirm = vi.fn();
  const navigate = vi.fn();
  const push = vi.fn();
  renderWithState(
    <RecordNavigation navigate={navigate} push={push}>
      <LeaveGuardProvider>
        <AskBeforeLeaving confirm={confirm} />
        <Menu />
      </LeaveGuardProvider>
    </RecordNavigation>,
    { state: makeState(), url },
  );
  return { confirm, navigate, push };
};

describe('Menu', () => {
  it('links to the conference pages', async () => {
    renderWithState(<Menu />, { state: makeState() });

    expect(await screen.findByText('Schedule')).toBeInTheDocument();
    for (const page of ['Schedule', 'Speakers', 'Map', 'About', 'Support']) {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
    expect(screen.getByText('Show Tutorial')).toBeInTheDocument();
  });

  it('offers login and signup when logged out', async () => {
    renderWithState(<Menu />, { state: makeState({ user: { isLoggedin: false } }) });

    expect(await screen.findByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    // Only the account section's heading says "Account".
    expect(screen.getAllByText('Account')).toHaveLength(1);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('offers the account and logout when logged in', async () => {
    renderWithState(<Menu />, { state: makeState({ user: { isLoggedin: true, username: 'ionitron' } }) });

    expect(await screen.findByText('Logout')).toBeInTheDocument();
    // "Account" is also the heading of the account section.
    expect(screen.getAllByText('Account')).toHaveLength(2);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('toggles dark mode', async () => {
    renderWithState(<Menu />, { state: makeState() });
    const toggle = (await screen.findByText('Dark Mode')) as HTMLIonToggleElement;
    expect(toggle.checked).toBe(false);

    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.checked).toBe(true));

    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.checked).toBe(false));
  });

  it('asks the page that is showing before opening another page', async () => {
    const { confirm, navigate, push } = renderAskingMenu('/support');

    fireEvent.click(await screen.findByText('Schedule'));
    expect(confirm).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByText('Show Tutorial'));
    expect(confirm).toHaveBeenCalledTimes(2);

    // Nothing opens until the page agrees to be left.
    expect(navigate).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();

    confirm.mock.calls[0][0]();
    expect(push).toHaveBeenCalledWith('/tabs/schedule', 'none');
  });

  it('does not ask when opening the page that is showing', async () => {
    const { confirm } = renderAskingMenu('/support');

    fireEvent.click(await screen.findByText('Support'));

    expect(confirm).not.toHaveBeenCalled();
  });
});
