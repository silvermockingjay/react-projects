import { type JSX } from 'react';
import styles from './CustomSection.module.css';
import classNames from 'classnames';

interface SectionProps {
  children: React.ReactNode;
  customClass?: string;
}

export function CustomSection({
  children,
  customClass,
}: SectionProps): JSX.Element {
  return (
    <section className={classNames(styles.pageSection, customClass)}>
      {children}
    </section>
  );
}
