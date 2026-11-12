import type { PropsWithChildren } from 'react';
import React, { useMemo, useRef } from 'react';

import type { ConfirmLeave, LeaveGuard } from './LeaveGuardContext';
import { LeaveGuardContext } from './LeaveGuardContext';

/**
 * Lets a page ask before the app navigates away from it, such as when it has unsaved input.
 * Only the in-app navigation that goes through requestLeave asks, not the browser or hardware back button.
 */
export const LeaveGuardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const confirmLeave = useRef<ConfirmLeave | undefined>(undefined);

  const guard = useMemo<LeaveGuard>(
    () => ({
      requestLeave: (leave) => (confirmLeave.current ? confirmLeave.current(leave) : leave()),
      registerConfirmLeave: (confirm) => {
        confirmLeave.current = confirm;
        return () => {
          // A page that registered later keeps its confirmation.
          if (confirmLeave.current === confirm) {
            confirmLeave.current = undefined;
          }
        };
      },
    }),
    [],
  );

  return <LeaveGuardContext.Provider value={guard}>{children}</LeaveGuardContext.Provider>;
};
