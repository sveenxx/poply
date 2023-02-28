import { DefaultOptions, Toast, ToastType } from './types';
import { getRandomId } from './utils/get-random-id';

const DEFAULT_OPTIONS = {
  position: 'bottom-center',
  duration: 3000,
} as DefaultOptions;

const observers = new Set<{
  (): void;
}>();

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

  update() {
    observers.forEach((observer) => observer());
  },

  delete(id: string) {
    const toast = toasts.find((toast) => toast.id === id);

    if (!toast) {
      return;
    }

    clearTimeout(toast.timeout);
    toasts = toasts.filter((toast) => toast.id !== id);
    this.update();
  },

  add({
    message,
    type,
    ...options
  }: { message: string; type: ToastType } & Partial<DefaultOptions>) {
    if (!document.getElementById('poply-toaster')) {
      throw new Error('[poply] Toaster not found. Please add <Toaster /> to your app.');
    }

    if (toasts.map((toast) => toast.message).includes(message)) {
      return;
    }

    const duration = options.duration || DEFAULT_OPTIONS.duration;
    const position = options.position || DEFAULT_OPTIONS.position;
    const id = getRandomId();

    toasts = [
      ...toasts,
      {
        id,
        message,
        duration,
        type,
        position,
        timeout: setTimeout(() => {
          this.delete(id);
        }, duration),
        destroy: () => this.delete(id),
      },
    ];
    this.update();
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
