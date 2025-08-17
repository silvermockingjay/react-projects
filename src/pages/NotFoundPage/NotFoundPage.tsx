import styles from './NotFoundPage.module.css';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';

export async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage');
  return (
    <div className={styles.notFoundContainer}>
      <h1>{t('title')}</h1>
      <p>{t('sorryTxt')}</p>
      <Link href="/" className={styles.backLink}>
        {t('backBtnTxt')}
      </Link>
    </div>
  );
}
