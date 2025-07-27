import classNames from 'classnames';
import styles from './CustomButton.module.css';
import type { JSX } from 'react';

export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  customClass?: string;
  text: string;
  onClick?: () => void;
}

export function CustomButton({
  type = 'button',
  customClass,
  text,
  onClick,
}: CustomButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={classNames(styles.button, customClass)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
