import React from 'react';
import { ToastType } from '../types';

export const Toast = ({
  message,
  onClick,
  type,
}: {
  message: string;
  onClick: () => void;
  type: ToastType;
}) => {
  return <div>{message}</div>;
};
