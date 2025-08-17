'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import styles from './LanguageControllers.module.css';
import { CustomButton } from '../CustomButton/CustomButton';

export function LanguageControllers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const changeLang = (option: string) => {
    router.replace(`${pathname}?${searchParams.toString()}`, {
      locale: option,
    });
  };
  return (
    <div className={styles.langControllers}>
      <CustomButton
        onClick={() => changeLang('en')}
        text="EN"
        customClass={styles.langBtn}
      />
      <CustomButton
        onClick={() => changeLang('rs')}
        text="RS"
        customClass={styles.langBtn}
      />
    </div>
  );
}
