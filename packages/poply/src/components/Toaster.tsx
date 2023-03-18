import React, { memo, ReactNode, useSyncExternalStore } from 'react';
import { toastStore } from '../toast';
import { Toast, ToastProps, ToastWrapper } from './Toast';
import { setup } from 'goober';

setup(React.createElement);

type ToasterProps = {
  bgColor?: string;
  textColor?: string;
  customComponent?: (props: ToastProps) => ReactNode;
};

export const Toaster = ({ bgColor, textColor, customComponent }: ToasterProps) => {
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
      {toasts.map((toast) =>
        customComponent ? (
          <ToastWrapper
            toastIndex={toasts.indexOf(toast)}
            position={toast.position}
            isVisible={toast.isVisible}
            key={toast.id}
          >
            {customComponent({
              ...toast,
              bgColor,
              remove: toast.destroy,
              textColor,
              toastIndex: toasts.indexOf(toast),
            })}
          </ToastWrapper>
        ) : (
          <Toast
            {...toast}
            bgColor={bgColor}
            textColor={textColor}
            remove={toast.destroy}
            key={toast.id}
            toastIndex={toasts.indexOf(toast)}
          />
        ),
      )}
    </div>
  );
};
