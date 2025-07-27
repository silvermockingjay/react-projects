import type { JSX } from 'react';
import styles from './Loader.module.css';

export function Loader(): JSX.Element {
  return <div className={styles.pageLoader}></div>;
}
