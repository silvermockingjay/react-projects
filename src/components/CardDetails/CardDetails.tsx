'use client';

import type { JSX } from 'react';
import styles from './CardDetails.module.css';
import { Loader } from '../Loader/Loader';
import { Fallback } from '../FallBack/Fallback';
import { CustomButton } from '../CustomButton/CustomButton';
import { useGetCharacterQuery } from '../../services/RickAndMortyAPI/rickAndMorty';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { useTranslations } from 'use-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function CardDetails(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = Number(searchParams?.get('detailsId'));
  const t = useTranslations('RefreshBtn');

  const { data: details, error, isLoading, refetch } = useGetCharacterQuery(id);

  const closeDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams || {});
    newSearchParams.delete('detailsId');
    router.replace(`${pathname}?${newSearchParams.toString()}`);
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
  } else if (details) {
    content = (
      <div className={styles.itemCard} role="region" aria-label="card details">
        <div className={styles.itemContainer}>
          <CustomButton
            type="button"
            text="X"
            customClass={styles.closeBtn}
            onClick={closeDetails}
          />
          <img
            className={styles.itemImage}
            src={details?.image}
            alt={details?.name}
          />
        </div>
        <div>
          <h3 className={styles.itemTitle}>{details?.name}</h3>
          <div className={styles.itemContent}>
            <ul className={styles.detailsList}>
              <li>
                <b>Status: </b> {details?.status}
              </li>
              <li>
                <b>Species: </b> {details?.species}
              </li>
              <li>
                <b>Gender: </b> {details?.gender}
              </li>
              <li>
                <b>Origin: </b> {details?.origin?.name}
              </li>
              <li>
                <b>Location: </b> {details?.location?.name}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      {content}
      <RefreshButton onClick={() => refetch()} text={t('refreshDetBtnTxt')} />
    </div>
  );
}
