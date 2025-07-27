import React from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { Input } from '../Input/Input';
import styles from './SearchForm.module.css';

export interface FormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SearchForm extends React.Component<FormProps> {
  render() {
    const { value, onSubmit, onChange } = this.props;
    return (
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <Input
          type="text"
          value={value}
          className={styles.searchInput}
          placeholder="Search for characters from Rick and Morty, e.g: Rick Sanchez"
          onChange={onChange}
        />
        <CustomButton type="submit" customClass="searchBtn" text="Search" />
      </form>
    );
  }
}
