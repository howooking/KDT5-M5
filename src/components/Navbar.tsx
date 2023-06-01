import { Link } from 'react-router-dom';
import { MENUS } from '../constants/constants';
import styles from './Navbar.module.css';
import { logout } from '../api/api';
import { userStore } from '../store';

export default function Navbar() {
  const userInfo = userStore((state) => state.userInfo);
  const logoutUser = userStore((state) => state.logoutUser);

  const handleLogout = async () => {
    await logout(userInfo.accessToken);
    localStorage.removeItem('token');
    logoutUser();
  };

  return (
    <header className={styles.header}>
      <Link to="/">홈으로</Link>
      <ul>
        {MENUS.map((menu) => {
          return (
            <li key={menu.href}>
              <Link to={menu.href}>{menu.label}</Link>
            </li>
          );
        })}
        <li>
          {userInfo.accessToken ? (
            <>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
            </>
          )}
        </li>
      </ul>
    </header>
  );
}
