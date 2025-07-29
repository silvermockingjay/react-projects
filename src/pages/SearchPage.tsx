import { useEffect, useState } from 'react';
import { useLocalStorage } from '../services/CustomHooks/useLocalStorage';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { CustomSection } from '../components/CustomSection/CustomSection';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { CardList } from '../components/CardList/CardList';
import { getCharacters } from '../services/APIRequests/getCharacters';
import type { Character } from '../services/interfaces/interfaces';
import { Loader } from '../components/Loader/Loader';
import { Fallback } from '../components/FallBack/Fallback';
import { PaginationControls } from '../components/PaginationControls/PaginationControls';
import { Outlet } from 'react-router';
import styles from './SearchPage.module.css';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Character[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [localQuery, setLocalQuery] = useLocalStorage('query', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (query: string, page: number): Promise<void> => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getCharacters(query, page);
      setResults(data.results);
      setTotalPages(data.info.count);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error.message);
        setLoading(false);
      } else {
        setFetchError('Unknown error occurred');
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const character = query.trim();
    setLocalQuery(character);
    setPage(1);
    await handleSearch(character, page);
  };

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      const character = localQuery;
      setQuery(character);
      await handleSearch(character, page);
    };

    fetchCards();
  }, [localQuery, page]);

  const prevPage = async (): Promise<void> => {
    const prevPage = page - 1;
    setPage(prevPage);
    searchParams.set('page', `${prevPage}`);
    setSearchParams(searchParams);
    await handleSearch(localQuery, prevPage);
  };

  const nextPage = async (): Promise<void> => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchParams.set('page', `${nextPage}`);
    setSearchParams(searchParams);
    await handleSearch(localQuery, nextPage);
  };

  useEffect(() => {
    const fetchPage = async (): Promise<void> => {
      const pageSearch = Number(searchParams.get('page')) || 1;
      setPage(pageSearch);
      await handleSearch(localQuery, pageSearch);
    };
    fetchPage();
  }, [searchParams, localQuery]);

  const openDetails = (e: React.MouseEvent<HTMLElement>): void => {
    const detailsId = e.currentTarget.dataset.id || '';
    searchParams.set('details', detailsId);
    setSearchParams(searchParams);
    navigate(`/${page}/${detailsId}`);
  };

  let content: React.ReactNode;
  if (loading) {
    content = <Loader />;
  } else if (fetchError) {
    content = <Fallback text={fetchError} />;
  } else if (results?.length === 0) {
    content = <Fallback text="No results found, try another character" />;
  } else if (results) {
    content = (
      <>
        <CardList cards={results} open={openDetails} />
        <PaginationControls
          prevPage={prevPage}
          nextPage={nextPage}
          page={page}
          totalPages={totalPages}
        />
      </>
    );
  }

  const params = useParams();

  const contentClass = params.details
    ? styles.partialViewRes
    : styles.totalViewRes;

  const outletClass = params.details
    ? styles.partialViewDetails
    : styles.noViewDetails;

  return (
    <>
      <CustomSection>
        <SearchForm
          onChange={handleInput}
          onSubmit={handleSubmit}
          value={query}
        />
      </CustomSection>
      <CustomSection customClass={styles.resultsView}>
        <div className={contentClass}>{content}</div>
        <div className={outletClass}>
          <Outlet />
        </div>
      </CustomSection>
    </>
  );
}
