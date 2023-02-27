import React, { useSyncExternalStore } from 'react';
import { toastStore } from '../toast';
import { Toast } from './Toast';

export const Toaster = () => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapShot,
    toastStore.getServerSnapShot,
  );

  return (
    <div id="poply-toaster">
      {toasts.map(({ message, type, id, timeout, duration, destroy }) => (
        <Toast message={message} type={type} onClick={destroy} key={id} />
      ))}
    </div>
  );
};
