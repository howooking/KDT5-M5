import { Link } from 'react-router-dom';
import { MENUS } from '../constants/constants';
import styles from './Navbar.module.css';
import { logout } from '../api/authApi';
import useUser from '../hooks/useUser';

export default function Navbar() {
  const { userInfo, logoutUser, isAdmin } = useUser();

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
              {isAdmin ? <Link to="/admin">관리자</Link> : <></>}
              <span>{userInfo.user.displayName}님</span>
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
