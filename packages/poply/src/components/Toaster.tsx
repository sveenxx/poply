import React, { useSyncExternalStore } from 'react';
import { toastStore } from '../toast';
import { Toast } from './Toast';
import { setup } from 'goober';

setup(React.createElement);

export const Toaster = ({ bgColor, textColor }: { bgColor?: string; textColor?: string }) => {
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
      {toasts.map((toast) => (
        <Toast
          message={toast.message}
          type={toast.type}
          bgColor={bgColor}
          textColor={textColor}
          onClick={toast.destroy}
          position={toast.position}
          isVisible={toast.visible}
          key={toast.id}
          toastsCount={toasts.length}
          toastIndex={toasts.indexOf(toast)}
        />
      ))}
    </div>
  );
};
