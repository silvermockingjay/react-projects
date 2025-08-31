import React, { Suspense, useState } from 'react';
import styles from './MainPage.module.css';
import { Table } from '../components/Table/Table';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Filters } from '../components/Filters/Filters';
import years from '../utils/years';
import sort from '../utils/sorting';

export function MainPage() {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState(0);
  const [sortBy, setSortBy] = useState<'population' | 'name'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [query, setQuery] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(query);
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    if (filter === 'name') {
      setSortBy('name');
    } else if (filter === 'population/asc') {
      setSortBy('population');
      setSortOrder('asc');
    } else if (filter === 'population/desc') {
      setSortBy('population');
      setSortOrder('desc');
    }
  };

  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  return (
    <div>
      <section className={styles.controls}>
        <SearchBar onChange={onInputChange} onSubmit={onFormSubmit} />
        <Filters data={years} onChange={onYearChange} />
        <Filters data={sort} onChange={onSortChange} />
      </section>
      <section className={styles.dataTable}>
        <Suspense fallback="Loading data...">
          <Table
            search={search}
            year={year}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </Suspense>
      </section>
    </div>
  );
}
