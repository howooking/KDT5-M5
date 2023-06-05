import { Link } from 'react-router-dom';
import { SUB_MENUS } from '../constants/constants';
import styles from './SubNavbar.module.css';

export default function SubNavbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {SUB_MENUS.map((menu) => (
          <li>
            <Link to={menu.href} className={styles.link}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
