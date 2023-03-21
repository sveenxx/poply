import { ToastPosition } from './types';

type ConfigValue = {
  maxToasts: number | null;
  maxToastsPerMessage: number | null;
  duration: number;
  position: ToastPosition;
};

type ConfigValueKey = keyof ConfigValue;

class Config {
  value: ConfigValue = {
    maxToasts: null,
    maxToastsPerMessage: null,
    duration: 3000,
    position: 'bottom-right',
  };

  set<K extends ConfigValueKey>(key: K, value: ConfigValue[K]) {
    this.value[key] = value;
  }
}

export const config = Object.freeze(new Config());
