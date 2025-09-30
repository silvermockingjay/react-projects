import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../services/CustomHooks/useLocalStorage';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { CustomSection } from '../../components/CustomSection/CustomSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CardList } from '../../components/CardList/CardList';
import { getCharacters } from '../../services/APIRequests/getCharacters';
import type { Character } from '../../services/interfaces/interfaces';
import { Loader } from '../../components/Loader/Loader';
import { Fallback } from '../../components/FallBack/Fallback';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { Outlet } from 'react-router';
import { Flyout } from '../../components/Flyout/Flyout';
import styles from './SearchPage.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  allCleared,
  restoredFromLS,
  selectCheckedCards,
} from '../../features/cards/cardsSlice';

export function SearchPage() {
  const [localQuery, setLocalQuery] = useLocalStorage('query', '');
  const [checkedCards, setCheckedCards] = useLocalStorage('selectedCards', '');
  const [query, setQuery] = useState(() => localQuery);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Character[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCards = useAppSelector(selectCheckedCards);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const areDetailsOpen = location.pathname === '/details';

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (
    query: string,
    page: number,
    signal?: AbortSignal
  ): Promise<void> => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getCharacters(query, page, signal);
      setResults(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      if (error instanceof Error) {
        setFetchError(error.message);
      } else {
        setFetchError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const character = localQuery;
    if (character) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('search', character);
      newSearchParams.set('page', '1');
      setPage(1);
      setQuery(character);
      setSearchParams(newSearchParams);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCards = async (): Promise<void> => {
      const searchQuery = searchParams.get('search') || '';
      const pageQuery = Number(searchParams.get('page')) || 1;
      setQuery(searchQuery);
      setPage(pageQuery);
      await handleSearch(searchQuery, pageQuery, controller.signal);
    };
    fetchCards();
    return () => controller.abort();
  }, [searchParams]);

  useEffect(() => {
    setCheckedCards(JSON.stringify(selectedCards));
  }, [selectedCards, setCheckedCards]);

  useEffect(() => {
    if (checkedCards.length) {
      dispatch(restoredFromLS(JSON.parse(checkedCards)));
    } else {
      dispatch(allCleared());
    }
  }, [checkedCards, dispatch]);

  const closeDetailsOnPagination = (params: URLSearchParams): void => {
    if (areDetailsOpen) {
      params.delete('detailsId');
      navigate(`/?${params.toString()}`);
    } else {
      setSearchParams(params);
    }
  };

  const prevPage = async (): Promise<void> => {
    const prevPage = page - 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${prevPage}`);
    closeDetailsOnPagination(newSearchParams);
  };

  const nextPage = async (): Promise<void> => {
    const nextPage = page + 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${nextPage}`);
    closeDetailsOnPagination(newSearchParams);
  };

  const openDetails = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    if (target.closest('input[type="checkbox"]')) return;
    const detailsId = e.currentTarget.dataset.id || '';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('detailsId', detailsId);
    setSearchParams(newSearchParams);
    navigate(`/details?${newSearchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <CustomSection>
        <Flyout />
      </CustomSection>
    </>
  );
}
