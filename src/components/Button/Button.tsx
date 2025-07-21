import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  text: string;
  onClick?: () => void;
}

export class Button extends React.Component<ButtonProps> {
  render() {
    const { type = 'button', className, text, onClick } = this.props;
    return (
      <button
        type={type}
        className={`${styles.button} ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}
