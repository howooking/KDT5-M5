import { Link } from 'react-router-dom';
import styles from './SubNavbar.module.css';

interface SubNavbarProps {
  menus: {
    label: string;
    href: string;
  }[];
}

export default function SubNavbar({ menus }: SubNavbarProps) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {menus.map((menu) => (
          <li key={menu.label}>
            <Link to={menu.href} className={styles.link}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
