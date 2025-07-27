import { type JSX } from 'react';
import styles from './Fallback.module.css';

interface FallbackProps {
  text: string;
}

export function Fallback({ text }: FallbackProps): JSX.Element {
  return <div className={styles.fallback}>{text}</div>;
}
