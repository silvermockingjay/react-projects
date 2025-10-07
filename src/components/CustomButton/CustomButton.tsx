import classNames from 'classnames';
import styles from './CustomButton.module.css';
import type { JSX } from 'react';

export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  style: 'primary' | 'secondary' | 'iconBtn';
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export function CustomButton({
  type = 'button',
  style,
  text,
  onClick,
  isDisabled,
}: CustomButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[style])}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
