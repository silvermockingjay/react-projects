import React, { Suspense, useState } from 'react';
import styles from './MainPage.module.css';
import { Table } from '../components/Table/Table';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Filters } from '../components/Filters/Filters';
import { Modal } from '../components/Modal/Modal';
import years from '../utils/years';
import sort from '../utils/sorting';

export function MainPage() {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState(0);
  const [sortBy, setSortBy] = useState<'population' | 'name'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [optionalCol, setOptionalCol] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <section className={styles.controls}>
        <SearchBar onChange={onInputChange} onSubmit={onFormSubmit} />
        <Filters
          data={years}
          onChange={onYearChange}
          labelTxt="Select a year"
        />
        <Filters data={sort} onChange={onSortChange} labelTxt="Filter by" />
        <button className={styles.modalBtn} onClick={openModal}>
          Add columns
        </button>
      </section>
      <section className={styles.dataTable}>
        <Suspense fallback="Loading data...">
          <Table
            search={search}
            year={year}
            sortBy={sortBy}
            sortOrder={sortOrder}
            optionalCol={optionalCol}
          />
        </Suspense>
      </section>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          optionalCol={optionalCol}
          setOptionalCol={setOptionalCol}
        />
      )}
    </div>
  );
}
