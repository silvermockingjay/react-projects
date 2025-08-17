import { useNavigate } from 'react-router';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import styles from './NotFoundPage.module.css';
import { useTranslations } from 'next-intl';

export function NotFoundPage() {
  const navigate = useNavigate();
  const onClick = () => navigate('/');
  const t = useTranslations('NotFoundPage');
  return (
    <div className={styles.notFoundContainer}>
      <h1>{t('title')}</h1>
      <p>{t('sorryTxt')}</p>
      <CustomButton
        type="button"
        text={t('backBtnTxt')}
        customClass="backHomeBtn"
        onClick={onClick}
      />
    </div>
  );
}
