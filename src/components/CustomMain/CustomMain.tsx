import { type JSX } from 'react';
import styles from './CustomMain.module.css';

interface MainProps {
  children: React.ReactNode;
}

export function CustomMain({ children }: MainProps): JSX.Element {
  return <main className={styles.searchPage}>{children}</main>;
}
