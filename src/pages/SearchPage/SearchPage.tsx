import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../services/CustomHooks/useLocalStorage';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { CustomSection } from '../../components/CustomSection/CustomSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CardList } from '../../components/CardList/CardList';
import { Loader } from '../../components/Loader/Loader';
import { Fallback } from '../../components/FallBack/Fallback';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { Outlet } from 'react-router';
import { Flyout } from '../../components/Flyout/Flyout';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  allCleared,
  restoredFromLS,
  selectCheckedCards,
} from '../../features/cards/cardsSlice';
import { useGetCharactersQuery } from '../../services/RickAndMortyAPI/rickAndMorty';

import styles from './SearchPage.module.css';

export function SearchPage() {
  const [localQuery, setLocalQuery] = useLocalStorage('query', '');
  const [checkedCards, setCheckedCards] = useLocalStorage('selectedCards', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [inputValue, setInputValue] = useState(query);

  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    name: query,
    page: page,
  });

  const results = data?.results || null;
  const totalPages = data?.info.pages || 0;

  const selectedCards = useAppSelector(selectCheckedCards);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const areDetailsOpen = location.pathname === '/details';
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const character = inputValue.trim();
    setLocalQuery(character);
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
      setSearchParams(newSearchParams);
    }
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

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

  const navigateToPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${page}`);
    closeDetailsOnPagination(newSearchParams);
  };

  const prevPage = () => navigateToPage(page - 1);
  const nextPage = () => navigateToPage(page + 1);

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
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    let message = 'Unknown error occured, try one more time';
    if ('status' in error && 'data' in error && error.status === 404) {
      message = 'Character not found, try another one';
    }
    content = <Fallback text={message} />;
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
          value={inputValue}
        />
        <CustomButton
          type="button"
          style="secondary"
          onClick={() => refetch()}
          text="Refresh results"
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
