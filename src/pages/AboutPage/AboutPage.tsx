import styles from './AboutPage.module.css';
import { getTranslations } from 'next-intl/server';

export async function AboutPage() {
  const t = await getTranslations('AboutPage');
  return (
    <div data-testid="about-page-content" className={styles.aboutContainer}>
      <div>{t('author')}</div>
      <div>
        GitHub:
        <a
          className={styles.aboutLink}
          href="https://github.com/silvermockingjay"
          target="_blank"
          rel="noreferrer"
        >
          @silvermockingjay
        </a>
      </div>
      <div>
        {t('app')}
        <a
          className={styles.aboutLink}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React 2025 Q3 course
        </a>
      </div>
    </div>
  );
}
