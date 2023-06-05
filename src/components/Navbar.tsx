/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { MENUS } from '../constants/constants';
import styles from './Navbar.module.css';
import { userStore } from '../store';
import { useEffect } from 'react';

export default function Navbar() {
  const { userInfo, logoutUser, authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  console.log(userInfo);

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
              {userInfo.isAdmin ? <Link to="/admin">관리자</Link> : <></>}
              <span><Link to ="/editUser">{userInfo.user.displayName}님</Link></span>
              <button onClick={logoutUser}>로그아웃</button>
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
