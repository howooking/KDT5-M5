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
      <nav>
        <ul>
          <li>
            <Link to="selectBank">계좌 현황? 정보?</Link>
          </li>
          <li>
            <Link to="connectAccount">계좌 연결</Link>
          </li>
          <li>
            <Link to="accountList">연결한 계좌</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AccountPage;
