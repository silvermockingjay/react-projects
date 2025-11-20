import { NavLink } from 'react-router';
import { navLinks } from '../../utils/navLinks';
import styles from './CustomHeader.module.css';

export function CustomHeader() {
  return (
    <nav className={styles.nav}>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}
