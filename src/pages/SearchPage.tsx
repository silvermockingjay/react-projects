import { useEffect, useState, useRef } from 'react';
import { useLocalStorage } from '../services/CustomHooks/useLocalStorage';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
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
  const [localQuery, setLocalQuery] = useLocalStorage('query', '');
  const [query, setQuery] = useState(() => localQuery);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Character[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = useLocation();
  const areDetailsOpen = location.pathname === '/details';

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (query: string, page: number): Promise<void> => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getCharacters(query, page);
      setResults(data.results);
      setTotalPages(data.info.pages);
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
    const newSearchParams = new URLSearchParams();
    if (character) {
      newSearchParams.set('search', character);
      newSearchParams.set('page', '1');
    }

    if (areDetailsOpen) {
      navigate(`/?${newSearchParams.toString()}`);
    } else {
      setSearchParams(newSearchParams);
    }
  };

  const renderedOnMount = useRef(false);
  useEffect(() => {
    if (renderedOnMount.current) return;
    renderedOnMount.current = true;
    const character = localQuery;
    if (character) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('search', character);
      newSearchParams.set('page', '1');
      setPage(1);
      setQuery(character);
      setSearchParams(newSearchParams);
    }
  }, [localQuery, setSearchParams]);

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      const searchQuery = searchParams.get('search') || '';
      const pageQuery = Number(searchParams.get('page')) || 1;
      setQuery(searchQuery);
      setPage(pageQuery);
      await handleSearch(searchQuery, pageQuery);
    };

    fetchCards();
  }, [searchParams]);

  const prevPage = async (): Promise<void> => {
    const prevPage = page - 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${prevPage}`);
    setSearchParams(newSearchParams);
  };

  const nextPage = async (): Promise<void> => {
    const nextPage = page + 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${nextPage}`);
    setSearchParams(newSearchParams);
  };

  const openDetails = (e: React.MouseEvent<HTMLElement>): void => {
    const detailsId = e.currentTarget.dataset.id || '';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('detailsId', detailsId);
    setSearchParams(newSearchParams);
    navigate(`/details?${newSearchParams.toString()}`);
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

  const contentClass = areDetailsOpen
    ? styles.partialViewRes
    : styles.totalViewRes;

  const outletClass = areDetailsOpen
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
