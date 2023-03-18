import React, { memo, ReactNode, useSyncExternalStore } from 'react';
import { toastStore } from '../toast';
import { Toast, ToastProps, ToastWrapper } from './Toast';
import { setup } from 'goober';
import { ToastPosition } from '../types';
import { DEFAULT_POSITION } from '../constants';

setup(React.createElement);

type ToasterProps = {
  bgColor?: string;
  textColor?: string;
  position?: ToastPosition;
  duration?: number;
  customComponent?: (props: ToastProps) => ReactNode;
};

export const Toaster = ({
  bgColor,
  textColor,
  customComponent,
  position,
  duration,
}: ToasterProps) => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapShot,
    toastStore.getServerSnapShot,
  );

  return (
    <div
      id="poply-toaster"
      style={{
        zIndex: 2115,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const toastPosition = toast.position || position || DEFAULT_POSITION;

        return customComponent ? (
          <ToastWrapper
            toastIndex={toasts.indexOf(toast)}
            position={toastPosition}
            isVisible={toast.isVisible}
            key={toast.id}
          >
            {customComponent({
              ...toast,
              bgColor,
              remove: toast.destroy,
              textColor,
              position: toastPosition,
              toastIndex: toasts.indexOf(toast),
            })}
          </ToastWrapper>
        ) : (
          <Toast
            {...toast}
            bgColor={bgColor}
            textColor={textColor}
            position={toastPosition}
            remove={toast.destroy}
            key={toast.id}
            toastIndex={toasts.indexOf(toast)}
          />
        );
      })}
    </div>
  );
};
