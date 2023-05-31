import { Link } from "react-router-dom";
import { MENUS } from "../constants/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Link to="/">홈으로</Link>
      <ul>
        {MENUS.map((menu) => {
          return (
            <li>
              <Link to={menu.href}>{menu.label}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
