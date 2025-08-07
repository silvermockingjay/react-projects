import { type JSX } from 'react';

export interface InputProps {
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClass?: string;
  placeholder?: string;
  isChecked?: boolean;
}

export function CustomInput({
  type,
  value,
  customClass,
  placeholder,
  onChange,
  isChecked,
}: InputProps): JSX.Element {
  return (
    <input
      type={type}
      value={value}
      className={customClass}
      placeholder={placeholder}
      onChange={onChange}
      {...(isChecked !== undefined ? { checked: isChecked } : {})}
    />
  );
}
