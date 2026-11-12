import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { LeaveGuard } from './LeaveGuardContext';
import { useLeaveGuard } from './LeaveGuardContext';
import { LEAVE_GUARD_BACK_BUTTON_PRIORITY, LeaveGuardProvider } from './LeaveGuardProvider';

// Fires Ionic's hardware back button event and runs the handler the provider registers for it.
const pressHardwareBack = (): { priority: number; processNextHandler: () => void } => {
  const processNextHandler = vi.fn();
  let priority = -1;
  document.dispatchEvent(
    new CustomEvent('ionBackButton', {
      detail: {
        register: (p: number, handler: (next: () => void) => void) => {
          priority = p;
          handler(processNextHandler);
        },
      },
    }),
  );
  return { priority, processNextHandler };
};

const renderGuard = (): LeaveGuard => {
  let guard: LeaveGuard | undefined;
  const Capture = () => {
    guard = useLeaveGuard();
    return null;
  };
  render(
    <LeaveGuardProvider>
      <Capture />
    </LeaveGuardProvider>,
  );
  return guard!;
};

describe('LeaveGuardProvider', () => {
  it('leaves right away when no page asks first', () => {
    const guard = renderGuard();
    const leave = vi.fn();

    guard.requestLeave(leave);

    expect(leave).toHaveBeenCalledOnce();
  });

  it('asks the registered confirmation instead of leaving', () => {
    const guard = renderGuard();
    const confirm = vi.fn();
    const leave = vi.fn();
    guard.registerConfirmLeave(confirm);

    guard.requestLeave(leave);

    expect(confirm).toHaveBeenCalledWith(leave);
    expect(leave).not.toHaveBeenCalled();
  });

  it('leaves without asking once the confirmation is removed', () => {
    const guard = renderGuard();
    const confirm = vi.fn();
    const leave = vi.fn();
    const unregister = guard.registerConfirmLeave(confirm);

    unregister();
    guard.requestLeave(leave);

    expect(confirm).not.toHaveBeenCalled();
    expect(leave).toHaveBeenCalledOnce();
  });

  it('keeps a later confirmation when an earlier one is removed', () => {
    const guard = renderGuard();
    const earlier = vi.fn();
    const later = vi.fn();
    const unregisterEarlier = guard.registerConfirmLeave(earlier);
    guard.registerConfirmLeave(later);

    unregisterEarlier();
    guard.requestLeave(vi.fn());

    expect(later).toHaveBeenCalledOnce();
    expect(earlier).not.toHaveBeenCalled();
  });

  it('lets the hardware back button go back when no page asks first', () => {
    renderGuard();

    const { priority, processNextHandler } = pressHardwareBack();

    expect(priority).toBe(LEAVE_GUARD_BACK_BUTTON_PRIORITY);
    expect(processNextHandler).toHaveBeenCalledOnce();
  });

  it('asks the registered confirmation before the hardware back button goes back', () => {
    const guard = renderGuard();
    const confirm = vi.fn();
    guard.registerConfirmLeave(confirm);

    const { processNextHandler } = pressHardwareBack();

    expect(confirm).toHaveBeenCalledWith(processNextHandler);
    expect(processNextHandler).not.toHaveBeenCalled();
  });
});
