import { type JSX } from 'react';

export interface InputProps {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClass?: string;
  placeholder?: string;
}

export function CustomInput({
  type,
  value,
  customClass,
  placeholder,
  onChange,
}: InputProps): JSX.Element {
  return (
    <input
      type={type}
      value={value}
      className={customClass}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
