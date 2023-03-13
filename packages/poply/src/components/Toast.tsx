import React from 'react';
import { ToastPosition, ToastType } from '../types';
import { styled, keyframes } from 'goober';
import { Close, Error, Info, Success, Warning } from './Icons.js';

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

const StyledToast = styled('div')<{ isVisible: boolean; bgColor?: string }>`
  background: ${({ bgColor }) => (bgColor ? bgColor : '#fff')};
  border-radius: 0.5rem;
  display: flex;
  height: ${TOAST_HEIGHT}rem;
  width: ${TOAST_WIDTH}rem;
  justify-content: space-between;
  align-items: center;
  ${({ isVisible }) =>
    isVisible
      ? `animation: ${fadeIn} 0.2s ease-in-out`
      : `animation: ${fadeOut} 0.2s ease-in-out; opacity: 0;`};
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
`;

const StyledToastMessage = styled('span')<{ textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : '#000')};
  font-size: 0.9rem;
  font-weight: 500;
`;

type ToastProps = {
  message: string;
  onClick: () => void;
  isVisible: boolean;
  toastsCount: number;
  toastIndex: number;
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

export const Toast = ({
  message,
  onClick,
  type,
  position,
  isVisible,
  toastIndex,
  bgColor,
  textColor,
}: ToastProps) => {
  function getIconByType(type: ToastType) {
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
  }

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
        bgColor={bgColor}
        isVisible={isVisible}
        style={{
          pointerEvents: 'auto',
        }}
      >
        <StyledToastContent>
          {getIconByType(type)}
          <StyledToastMessage textColor={textColor}>{message}</StyledToastMessage>
        </StyledToastContent>
        <StyledToastButton onClick={onClick}>
          <Close />
        </StyledToastButton>
      </StyledToast>
    </StyledToastWrapper>
  );
};
