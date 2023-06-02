import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h2>관리자 패널</h2>
      <nav>
        <ul>
          <li>
            <Link to="addProduct">상품추가</Link>
          </li>
          <li>
            <Link to="deleteProduct">상품삭제</Link>
          </li>
          <li>
            <Link to="updateProduct">상품수정</Link>
          </li>
          <li>
            <Link to="updateProduct">유저 관리</Link>
          </li>
          <li>
            <Link to="updateProduct">기타 등등</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Admin;
