'use client';

import type { JSX } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import styles from './PaginationControls.module.css';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}
export function PaginationControls({
  nextPage,
  prevPage,
  page,
  totalPages,
}: PaginationProps): JSX.Element {
  const prevPageClass = page === 1 ? 'controlBtn inactive' : 'controlBtn';
  const nextPageClass =
    page === totalPages ? 'controlBtn inactive' : 'controlBtn';
  const t = useTranslations('Pagination');
  return (
    <div className={styles.paginationControls}>
      <CustomButton
        type="button"
        text={t('prevPageBtnTxt')}
        customClass={prevPageClass}
        onClick={prevPage}
      />
      <div>{t('paginationTxt', { page: page, totalPages: totalPages })}</div>
      <CustomButton
        type="button"
        text={t('nextPageBtnTxt')}
        customClass={nextPageClass}
        onClick={nextPage}
      />
    </div>
  );
}
