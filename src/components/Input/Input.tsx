import React from 'react';

export interface InputProps {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

export class Input extends React.Component<InputProps> {
  render() {
    const { type, value, className, placeholder, onChange } = this.props;
    return (
      <input
        type={type}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
}
