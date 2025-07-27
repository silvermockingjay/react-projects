import React from 'react';
import classNames from 'classnames';
import styles from './CustomButton.module.css';

export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  customClass?: string;
  text: string;
  onClick?: () => void;
}

export class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    const { type = 'button', customClass, text, onClick } = this.props;
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
}
