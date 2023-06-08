import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { userStore } from '../../store';

const Admin = () => {
  const { authMe, } = userStore();
  useEffect(() => {
    authMe();
  }, [authMe]);
  return (
    <div className={'text-center'}>
      <h2 className={'text-3xl m-4'}>관리자 패널</h2>
      <nav className={'flex justify-center'}>
        <ul className={'flex text-2xl'}>
          <li className={'mr-4'}>
            <Link to="addProduct">상품추가</Link>
          </li>
          <li className={'mr-4'}>
            <Link to="deleteProduct">상품삭제</Link>
          </li>
          <li className={'mr-4'}>
            <Link to="updateProduct">상품수정</Link>
          </li>
          <li className={'mr-4'}>
            <Link to="userCheck">유저 관리</Link>
          </li>
          <li className={'mr-4'}>
            <Link to="searchProduct">상품검색</Link>
          </li>
          <li className={'mr-4'}>
            <Link to="updateProduct">기타 등등</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Admin;
