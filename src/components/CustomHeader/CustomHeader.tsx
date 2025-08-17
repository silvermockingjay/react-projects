'use client';

import { usePathname } from 'next/navigation';
import styles from './CustomHeader.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { LanguageControllers } from '../LanguageControllers/LanguageControllers';

export function CustomHeader() {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <div className={styles.header}>
      <nav>
        <Link
          href="/"
          className={pathname === '/' ? styles.linkActive : styles.link}
        >
          {t('main')}
        </Link>
        <Link
          href="/about"
          className={pathname === '/about' ? styles.linkActive : styles.link}
        >
          {t('about')}
        </Link>
      </nav>
      <LanguageControllers />
    </div>
  );
}
