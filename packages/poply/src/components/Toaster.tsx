import React, { memo, ReactNode, useSyncExternalStore } from 'react';
import { toastStore } from '../toast';
import { Toast, ToastProps, ToastWrapper } from './Toast';
import { setup } from 'goober';
import { ToastPosition } from '../types';
import { config } from '../config';

setup(React.createElement);

type ToasterProps = {
  bgColor?: string;
  textColor?: string;
  maxToasts?: number;
  position?: ToastPosition;
  maxToastsPerMessage?: number;
  duration?: number;
  customComponent?: (props: ToastProps) => ReactNode;
};

export const Toaster = ({
  bgColor,
  textColor,
  customComponent,
  position,
  duration,
  maxToasts,
  maxToastsPerMessage,
}: ToasterProps) => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapShot,
    toastStore.getServerSnapShot,
  );

  position && config.set('position', position);
  duration && config.set('duration', duration);
  maxToasts && config.set('maxToasts', maxToasts);
  maxToastsPerMessage && config.set('maxToastsPerMessage', maxToastsPerMessage);

  return (
    <div
      id="poply-toaster"
      style={{
        zIndex: 2115,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const toastIndex = toasts.indexOf(toast);

        return customComponent ? (
          <ToastWrapper
            toastIndex={toastIndex}
            position={toast.position}
            isVisible={toast.isVisible}
            key={toast.id}
          >
            {customComponent({
              ...toast,
              bgColor,
              textColor,
              toastIndex: toastIndex,
            })}
          </ToastWrapper>
        ) : (
          <Toast
            {...toast}
            bgColor={bgColor}
            textColor={textColor}
            key={toast.id}
            toastIndex={toastIndex}
          />
        );
      })}
    </div>
  );
};
