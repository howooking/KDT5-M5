import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { userStore } from '../../store';

const AccountPage = () => {
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, [authMe]);
  return (
    <div>
      <h2>계좌 관리</h2>
      <nav>
        <ul>
          <li>
            <Link to="connectAccount">계좌 연결</Link>
          </li>
          <li>
            <Link to="accountList">계좌 리스트</Link>
          </li>
          <li>
            <Link to="deleteAccount">계좌 삭제</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AccountPage;
