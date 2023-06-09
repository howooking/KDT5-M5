/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { userStore } from '../store';
import { useEffect } from 'react';
import Search from './Search';
import { BsCart } from 'react-icons/bs';
import SubNavbar from './SubNavbar';
import { SUB_MENUS } from '../constants/constants';

export default function Navbar() {
  const { userInfo, logoutUser, authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  // console.log(userInfo);

  return (
    <div>
      <header className="container relative mx-auto flex h-20 items-center justify-between px-20 text-sm">
        <Link to="/">
          <img src="/mainlogo.png" alt="logo" className="h-16" />
        </Link>
        <Search />
        <ul className="flex items-center gap-5">
          {userInfo?.accessToken ? (
            <>
              <li>
                <Link to="#" onClick={logoutUser} className="text-gray-500">
                  로그아웃
                </Link>
              </li>
              {userInfo.isAdmin ? (
                <Link to="/admin/clients" className="text-gray-500">
                  관리자
                </Link>
              ) : (
                <></>
              )}
              <Link to="/myaccount/info" className="text-gray-500">
                {userInfo.user.displayName}님
              </Link>
              <img
                src={userInfo.user.profileImg || '/defaultProfile.jpg'}
                alt="profile"
                className="h-9 w-9 rounded-full object-cover"
              />
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-500">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-500">
                  회원가입
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/mycart" className="text-accent">
              <BsCart size={20} />
            </Link>
          </li>
        </ul>
      </header>
      <SubNavbar menus={SUB_MENUS} />
    </div>
  );
}
