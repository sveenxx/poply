export type DefaultOptions = {
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  duration: number;
};

export type ToastType = 'error' | 'success' | 'warning' | 'info' | 'promise';

export type Toast = {
  id?: string;
  message: string;
  type: ToastType;
  duration: number;
  timeout: ReturnType<typeof setTimeout>;
  destroy: () => void;
};
