export type DefaultOptions = {
  position: ToastPosition | undefined;
  duration: number;
};

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastType = 'error' | 'success' | 'warning' | 'info' | 'promise';

export type Toast = {
  id?: string;
  message: string;
  type: ToastType;
  duration: number;
  position: ToastPosition | undefined;
  timeout: ReturnType<typeof setTimeout>;
  isVisible: boolean;
  destroy: () => void;
};
