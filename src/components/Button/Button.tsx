import React from 'react';
import styles from './Button.module.css';

interface MyProps {
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  text: string;
}

export class Button extends React.Component<MyProps> {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { type = 'button', className, text } = this.props;
    return (
      <button type={type} className={`${styles.button} ${className}`}>
        {text}
      </button>
    );
  }
}
