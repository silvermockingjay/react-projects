import { NavLink } from 'react-router';
import styles from './CustomHeader.module.css';

export function CustomHeader() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Main
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        About
      </NavLink>
    </nav>
  );
}
