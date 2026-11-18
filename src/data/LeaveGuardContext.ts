import { createContext, useContext } from 'react';

// Asks before leaving the page that is showing, and calls leave if the user agrees.
export type ConfirmLeave = (leave: () => void) => void;

export interface LeaveGuard {
  // Leaves right away, or once the page that is showing agrees to be left.
  requestLeave: (leave: () => void) => void;
  // Has requestLeave ask confirm first, until the returned function is called.
  registerConfirmLeave: (confirm: ConfirmLeave) => () => void;
}

export const LeaveGuardContext = createContext<LeaveGuard>({
  requestLeave: (leave) => leave(),
  registerConfirmLeave: () => () => undefined,
});

export const useLeaveGuard = (): LeaveGuard => useContext(LeaveGuardContext);
