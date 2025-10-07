import { type JSX } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomInput } from '../CustomInput/CustomInput';
import styles from './SearchForm.module.css';

export interface FormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SearchForm({
  value,
  onSubmit,
  onChange,
}: FormProps): JSX.Element {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <CustomInput
        type="text"
        value={value}
        customClass={styles.searchInput}
        placeholder="Search for characters from Rick and Morty, e.g: Rick Sanchez"
        onChange={onChange}
      />
      <CustomButton type="submit" style="primary" text="Search" />
    </form>
  );
}
