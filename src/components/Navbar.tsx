/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userStore } from '@/store';
import Search from '@/components/Search';
import { BsCart } from 'react-icons/bs';
import SubNavbar from '@/components/SubNavbar';
import { SUB_MENUS } from '@/constants/constants';
import ProfileImage from '@/components/ui/ProfileImage';

export default function Navbar() {
  // store에서 필요한 메소드(로그아웃, 인증), 유져정보를 가져옴
  const { userInfo, logoutUser, authMe } = userStore();

  // 인증
  useEffect(() => {
    authMe();
  }, []);

  return (
    <>
      <header className="container relative mx-auto flex h-20 items-center justify-between px-20 text-sm">
        <Link to="/">
          <img src="/mainlogo.png" alt="logo" className="h-16" />
        </Link>
        <Search />
        <ul className="flex items-center gap-5 text-gray-500">
          {/* 유져가 로그인 여부 */}
          {userInfo?.accessToken ? (
            // 로그인 되어있는 경우
            <>
              <li>
                <Link to="#" onClick={logoutUser}>
                  로그아웃
                </Link>
              </li>

              {/* 관리자 여부 */}
              {userInfo.isAdmin ? (
                // 관리자인 경우
                <Link to="/admin/clients">관리자</Link>
              ) : (
                // 관리자가 아닌경우
                <></>
              )}

              {/* 로그인한 회원정보 */}
              <Link to="/myaccount/info">{userInfo.user.displayName}님</Link>
              <ProfileImage small src={userInfo.user.profileImg} />
            </>
          ) : (
            // 로그인이 되어있지 않은 경우
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
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
    </>
  );
}
