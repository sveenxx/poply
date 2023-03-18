import { DefaultOptions, Toast, ToastPosition, ToastType } from './types';
import { getRandomId } from './utils/get-random-id';
import { DEFAULT_DURATION, TOAST_CLOSE_DELAY } from './constants';

const observers = new Set<{
  (): void;
}>();
const timeouts = new Map<string, NodeJS.Timeout>();

let toasts: Toast[] = [];

export const toastStore = Object.freeze({
  subscribe(observer: () => void): () => boolean {
    observers.add(observer);
    return () => observers.delete(observer);
  },

  getSnapShot() {
    return toasts;
  },

  getServerSnapShot() {
    return typeof window === 'undefined' ? [] : toasts;
  },

  refresh() {
    observers.forEach((observer) => observer());
  },

  update(id: string, options: Partial<Toast>) {
    const toast = toasts.find((toast) => toast.id === id);

    if (!toast) {
      return;
    }

    toasts = toasts.map((toast) => {
      if (toast.id === id) {
        return {
          ...toast,
          ...options,
        };
      }

      return toast;
    });

    this.refresh();
  },

  delete(id: string) {
    const toast = toasts.find((toast) => toast.id === id);

    if (!toast) {
      return;
    }

    this.update(id, { isVisible: false });
    clearTimeout(toast.timeout);

    const timeout = setTimeout(() => {
      toasts = toasts.filter((toast) => toast.id !== id);
      clearTimeout(timeouts.get(id));
      this.refresh();
    }, TOAST_CLOSE_DELAY);

    timeouts.set(id, timeout);
  },

  add({
    message,
    type,
    ...options
  }: { message: string; type: ToastType } & Partial<DefaultOptions>) {
    if (!document.getElementById('poply-toaster')) {
      throw new Error('[poply] Toaster not found. Please add <Toaster /> to your app.');
    }

    // if (toasts.map((toast) => toast.message).includes(message)) {
    //   return;
    // }

    const duration = options.duration || DEFAULT_DURATION;
    const position = options.position;
    const id = getRandomId();

    toasts = [
      {
        id,
        message,
        duration,
        type,
        position,
        isVisible: true,
        timeout: setTimeout(() => {
          this.delete(id);
        }, duration),
        destroy: () => this.delete(id),
      },
      ...toasts,
    ];
    this.refresh();
  },
});

export const toast = Object.freeze({
  error: (message: string, options?: Partial<DefaultOptions>) =>
    toastStore.add({ message, type: 'error', ...options }),
  success: (message: string, options?: Partial<DefaultOptions>) =>
    toastStore.add({ message, type: 'success', ...options }),
  warning: (message: string, options?: Partial<DefaultOptions>) =>
    toastStore.add({ message, type: 'warning', ...options }),
  info: (message: string, options?: Partial<DefaultOptions>) =>
    toastStore.add({ message, type: 'info', ...options }),
  promise: (message: string, options?: Partial<DefaultOptions>) =>
    toastStore.add({ message, type: 'promise', ...options }),
});
