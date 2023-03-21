import { DefaultOptions, Toast, ToastPosition, ToastType } from './types';
import { getRandomId } from './utils/get-random-id';
import { TOAST_CLOSE_DELAY } from './constants';
import { config } from './config';

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

    timeouts.set(
      id,
      setTimeout(() => {
        console.log(timeouts);
        toasts = toasts.filter((toast) => toast.id !== id);
        clearTimeout(timeouts.get(id));
        timeouts.delete(id);
        this.refresh();
      }, TOAST_CLOSE_DELAY),
    );
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

    const duration = options.duration || config.value.duration;
    const position = options.position || config.value.position;
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

    if (config.value.maxToasts && toasts.length > config.value.maxToasts) {
      const filteredToasts = toasts.filter((toast) => !timeouts.has(toast.id!));
      this.delete(filteredToasts.at(-1)!.id!);
    }

    if (config.value.maxToastsPerMessage) {
      const filteredToasts = toasts.filter(
        (toast) => toast.message === message && !timeouts.has(toast.id!),
      );
      if (filteredToasts.length > config.value.maxToastsPerMessage) {
        this.delete(filteredToasts.at(-1)!.id!);
      }
    }

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
