import { type JSX } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomInput } from '../CustomInput/CustomInput';
import { useTranslations } from 'next-intl';
import styles from './SearchForm.module.css';

export interface FormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SearchForm({
  value,
  onSubmit,
  onChange,
}: FormProps): JSX.Element {
  const t = useTranslations('SearchPage');
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <CustomInput
        type="text"
        value={value}
        customClass={styles.searchInput}
        placeholder={t('inputPlaceholder')}
        onChange={onChange}
      />
      <CustomButton
        type="submit"
        customClass="searchBtn"
        text={t('searchBtnTxt')}
      />
    </form>
  );
}
