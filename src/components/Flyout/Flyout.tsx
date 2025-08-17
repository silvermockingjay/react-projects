import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  allCleared,
  selectCount,
  selectCheckedCards,
} from '../../features/cards/cardsSlice';
import { downloadCSV } from '../../services/downloadCSV';
import { CustomButton } from '../CustomButton/CustomButton';
import { useRef } from 'react';
import styles from './Flyout.module.css';
import { useTranslations } from 'next-intl';

export function Flyout() {
  const t = useTranslations('flyout');
  const dispatch = useAppDispatch();
  const selectedCardsCount = useAppSelector(selectCount);
  const selectedCards = useAppSelector(selectCheckedCards);
  const unselectAll = (): void => {
    dispatch(allCleared());
  };
  const linkRef = useRef<HTMLAnchorElement>(null);
  const download = (): void => {
    downloadCSV({
      data: selectedCards,
      count: selectedCardsCount,
      ref: linkRef,
    });
  };
  const flyoutClass = selectedCardsCount ? styles.flyout : styles.hide;
  return (
    <div className={flyoutClass} data-testid="flyout">
      <div className={styles.items}>
        {t('items', { count: selectedCardsCount })}
      </div>
      <div className={styles.actions}>
        <CustomButton
          text={t('unselectBtnTxt')}
          customClass={styles.unselectBtn}
          onClick={unselectAll}
        />
        <CustomButton
          text={t('downloadBtnTxt')}
          customClass={styles.downloadBtn}
          onClick={download}
        />
        <a ref={linkRef} className={styles.hide}></a>
      </div>
    </div>
  );
}
