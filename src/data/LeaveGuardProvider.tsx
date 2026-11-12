import type { BackButtonEvent } from '@ionic/react';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

import type { ConfirmLeave, LeaveGuard } from './LeaveGuardContext';
import { LeaveGuardContext } from './LeaveGuardContext';

// Above the router's back navigation, and below the menu and overlays so an open alert or menu closes first.
export const LEAVE_GUARD_BACK_BUTTON_PRIORITY = 10;

/**
 * Lets a page ask before the app navigates away from it, such as when it has unsaved input.
 * The in-app navigation that goes through requestLeave asks, and so does the hardware back button.
 * The browser's back and forward buttons don't, since the router can't cancel them.
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

  useEffect(() => {
    const onBackButton = (ev: BackButtonEvent) => {
      ev.detail.register(LEAVE_GUARD_BACK_BUTTON_PRIORITY, (processNextHandler) => {
        if (confirmLeave.current) {
          confirmLeave.current(processNextHandler);
        } else {
          processNextHandler();
        }
      });
    };
    document.addEventListener('ionBackButton', onBackButton as EventListener);
    return () => document.removeEventListener('ionBackButton', onBackButton as EventListener);
  }, []);

  return <LeaveGuardContext.Provider value={guard}>{children}</LeaveGuardContext.Provider>;
};
