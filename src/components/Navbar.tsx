/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { userStore } from '../store';
import { useEffect } from 'react';
import Search from './Search';
import { BsCart } from 'react-icons/bs';
import SubNavbar from './SubNavbar';

export default function Navbar() {
  const { userInfo, logoutUser, authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  console.log(userInfo);

  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <img src="/mainlogo.png" alt="logo" className={styles.logo} />
        </Link>
        <Search />
        <ul className={styles.ul}>
          {userInfo.accessToken ? (
            <>
              <li>
                <Link to="#" onClick={logoutUser} className={styles.link}>
                  로그아웃
                </Link>
              </li>
              {userInfo.isAdmin ? (
                <Link to="/admin" className={styles.link}>
                  관리자
                </Link>
              ) : (
                <></>
              )}
              <Link to="/myaccount" className={styles.link}>
                {userInfo.user.displayName}님
              </Link>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.link}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup" className={styles.link}>
                  회원가입
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/mycart" className={styles.cart}>
              <BsCart size={20} />
            </Link>
          </li>
        </ul>
      </header>
      <SubNavbar />
    </div>
  );
}
