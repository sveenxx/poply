import React, { memo } from 'react';
import { ToastPosition, ToastType } from '../types';
import { styled, keyframes } from 'goober';
import { Close, Error, Info, Success, Warning } from './Icons';

const TOAST_HEIGHT = 4;
const TOAST_WIDTH = 20;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(-0.5rem);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.6) translateY(-0.5rem);;
  }
`;

const StyledToastWrapper = styled('div')<{ position: ToastPosition }>`
  position: fixed;
  ${(props) => (props.position.startsWith('top') ? 'top: 0;' : 'bottom: 0;')}
  left: 0;
  right: 0;
  display: flex;
  transition: all 0.2s ease-in-out;
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

const StyledToastAnimation = styled('div', React.forwardRef)<{ isVisible: boolean }>`
  ${({ isVisible }) =>
    isVisible
      ? `animation: ${fadeIn} 0.2s ease-in-out`
      : `animation: ${fadeOut} 0.2s ease-in-out; opacity: 0;`};
`;

const StyledToast = styled('div')<{ bgColor?: string }>`
  background: ${({ bgColor }) => (bgColor ? bgColor : '#fff')};
  border-radius: 0.5rem;
  display: flex;
  height: ${TOAST_HEIGHT}rem;
  width: ${TOAST_WIDTH}rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
`;

const StyledToastMessage = styled('span')<{ textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : '#000')};
  font-size: 0.9rem;
  font-weight: 500;
`;

export type ToastProps = {
  message: string;
  remove: () => void;
  isVisible: boolean;
  toastIndex?: number;
  type: ToastType;
  bgColor?: string;
  textColor?: string;
  position: ToastPosition;
};

const StyledToastContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledToastButton = styled('button')`
  background: none;
  border: none;
  padding: 1px;
  cursor: pointer;
`;

export const PoplyIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'success':
      return <Success />;
    case 'error':
      return <Error />;
    case 'warning':
      return <Warning />;
    case 'info':
      return <Info />;
    default:
      return <Success />;
  }
};

export const Toast = ({
  message,
  remove,
  type,
  position,
  isVisible,
  toastIndex,
  bgColor,
  textColor,
}: ToastProps) => {
  return (
    <ToastWrapper position={position} toastIndex={toastIndex!} isVisible={isVisible}>
      <StyledToast bgColor={bgColor}>
        <StyledToastContent>
          <PoplyIcon type={type} />
          <StyledToastMessage textColor={textColor}>{message}</StyledToastMessage>
        </StyledToastContent>
        <StyledToastButton onClick={remove}>
          <Close textColor={textColor} />
        </StyledToastButton>
      </StyledToast>
    </ToastWrapper>
  );
};

export const ToastWrapper = ({
  children,
  position,
  toastIndex,
  isVisible,
}: {
  children: React.ReactNode;
  position: ToastPosition;
  isVisible: boolean;
  toastIndex: number;
}) => {
  const [height, setHeight] = React.useState(0);

  return (
    <StyledToastWrapper
      position={position}
      style={{
        transform: position.startsWith('top')
          ? `translateY(${(height + 8) * toastIndex}px)`
          : `translateY(-${(height + 8) * toastIndex}px)`,
      }}
    >
      <StyledToastAnimation
        isVisible={isVisible}
        style={{
          pointerEvents: 'auto',
        }}
        ref={(node) => setHeight(node?.clientHeight ?? 0)}
      >
        {children}
      </StyledToastAnimation>
    </StyledToastWrapper>
  );
};
