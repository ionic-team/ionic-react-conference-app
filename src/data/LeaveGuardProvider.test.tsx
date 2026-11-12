import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { LeaveGuard } from './LeaveGuardContext';
import { useLeaveGuard } from './LeaveGuardContext';
import { LeaveGuardProvider } from './LeaveGuardProvider';

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
});
