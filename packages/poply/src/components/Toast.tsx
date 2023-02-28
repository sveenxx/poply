import React from 'react';
import { ToastPosition, ToastType } from '../types';
import { styled } from 'goober';

const TOAST_HEIGHT = 4;
const TOAST_WIDTH = 20;

const StyledToastWrapper = styled('div')<{ position: ToastPosition }>`
  position: fixed;
  ${(props) => (props.position.startsWith('top') ? 'top: 0;' : 'bottom: 0;')}
  left: 0;
  right: 0;
  display: flex;
  justify-content: ${(props) => {
    if (props.position.endsWith('left')) {
      return 'flex-start';
    }
    if (props.position.endsWith('right')) {
      return 'flex-end';
    }
    return 'center';
  }};
  align-items: center;
  padding: 1rem;
  z-index: 9999;
`;

const StyledToast = styled('div')`
  background: #fff;
  border-radius: 0.5rem;
  height: ${TOAST_HEIGHT}rem;
  width: ${TOAST_WIDTH}rem;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-0.2rem);
  }
`;

type ToastProps = {
  message: string;
  onClick: () => void;
  toastsCount: number;
  toastIndex: number;
  type: ToastType;
  position: ToastPosition;
};

export const Toast = ({
  message,
  onClick,
  type,
  position,
  toastsCount,
  toastIndex,
}: ToastProps) => {
  return (
    <StyledToastWrapper
      position={position}
      style={{
        transform: position.startsWith('top')
          ? `translateY(${(TOAST_HEIGHT + 0.5) * toastIndex}rem)`
          : `translateY(-${(TOAST_HEIGHT + 0.5) * toastIndex}rem)`,
      }}
    >
      <StyledToast
        style={{
          pointerEvents: 'auto',
        }}
      >
        {message}
        <button onClick={onClick}>X</button>
      </StyledToast>
    </StyledToastWrapper>
  );
};
