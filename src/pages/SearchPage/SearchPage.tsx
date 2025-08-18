'use client';

import { useEffect, useState, useRef } from 'react';
import { useLocalStorage } from '../../services/CustomHooks/useLocalStorage';
import { CustomSection } from '../../components/CustomSection/CustomSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CardList } from '../../components/CardList/CardList';
import { Loader } from '../../components/Loader/Loader';
import { Fallback } from '../../components/FallBack/Fallback';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { Flyout } from '../../components/Flyout/Flyout';
import styles from './SearchPage.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  allCleared,
  restoredFromLS,
  selectCheckedCards,
} from '../../features/cards/cardsSlice';
import { useGetCharactersQuery } from '../../services/RickAndMortyAPI/rickAndMorty';
import { RefreshButton } from '../../components/RefreshButton/RefreshButton';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function SearchPage() {
  const [localQuery, setLocalQuery] = useLocalStorage('query', '');
  const [checkedCards, setCheckedCards] = useLocalStorage('selectedCards', '');
  const [query, setQuery] = useState(() => localQuery);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations('RefreshBtn');

  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    name: query,
    page: page,
  });

  const results = data?.results || null;
  const totalPages = data?.info.pages || 0;

  const selectedCards = useAppSelector(selectCheckedCards);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const character = query.trim();
    setLocalQuery(character);
    setPage(1);
    const newSearchParams = new URLSearchParams();
    if (character) {
      newSearchParams.set('search', character);
      newSearchParams.set('page', '1');
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
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
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [localQuery, router, pathname, searchParams]);

  useEffect(() => {
    const searchQuery = searchParams?.get('search') || '';
    const pageQuery = Number(searchParams?.get('page')) || 1;
    setQuery(searchQuery);
    setPage(pageQuery);
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

  const prevPage = async (): Promise<void> => {
    const prevPage = page - 1;
    const newSearchParams = new URLSearchParams(searchParams || {});
    newSearchParams.set('page', `${prevPage}`);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const nextPage = async (): Promise<void> => {
    const nextPage = page + 1;
    const newSearchParams = new URLSearchParams(searchParams || {});
    newSearchParams.set('page', `${nextPage}`);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const openDetails = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    if (target.closest('input[type="checkbox"]')) return;
    const detailsId = e.currentTarget.dataset.id || '';
    const newSearchParams = new URLSearchParams(searchParams || {});
    newSearchParams.set('detailsId', detailsId);
    router.replace(`/details?${newSearchParams.toString()}`);
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

  return (
    <>
      <CustomSection>
        <SearchForm
          onChange={handleInput}
          onSubmit={handleSubmit}
          value={query}
        />
        <RefreshButton onClick={() => refetch()} text={t('refreshResBtnTxt')} />
      </CustomSection>
      <CustomSection customClass={styles.resultsView}>
        <div className={styles.totalViewRes}>{content}</div>
      </CustomSection>
      <CustomSection>
        <Flyout />
      </CustomSection>
    </>
  );
}
