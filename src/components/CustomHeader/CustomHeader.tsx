import { Link } from 'react-router';
import styles from './CustomHeader.module.css';

export function CustomHeader() {
  return (
    <nav className={styles.nav}>
      <Link to="/about" className={styles.link}>
        About
      </Link>
    </nav>
  );
}
