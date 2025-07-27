import { type JSX } from 'react';
import styles from './CustomSection.module.css';

interface SectionProps {
  children: React.ReactNode;
}

export function CustomSection({ children }: SectionProps): JSX.Element {
  return <section className={styles.pageSection}>{children}</section>;
}
