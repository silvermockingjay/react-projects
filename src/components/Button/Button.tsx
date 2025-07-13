import React from 'react';
import styles from './Button.module.css';

interface MyProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  text: string;
  onClick?: () => void;
}

export class Button extends React.Component<MyProps> {
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
