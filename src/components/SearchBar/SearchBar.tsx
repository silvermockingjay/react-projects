import type React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SearchBar({ onChange, onSubmit }: SearchBarProps) {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for country"
        onChange={onChange}
      />
      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
    </form>
  );
}
