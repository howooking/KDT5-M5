import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import Products from '@/routes/Products';
import Login from '@/routes/Auth/Login';
import SignUp from '@/routes/Auth/SignUp';
import Admin from '@/routes/Admin/Admin';
import AddProduct from '@/routes/Admin/AddProduct';
import ProtectedRoute from '@/components/ProtectedRoute';
import AccountList from '@/routes/Account/AccountList';
import AccountPage from '@/routes/Account/AccountPage';
import AdminProducts from '@/routes/Admin/AdminProducts';
import MyAccount from '@/routes/Auth/MyAccount';
import AdminClients from '@/routes/Admin/AdminClients';
import ChangeName from '@/routes/Auth/ChangeName';
import ChangePassword from '@/routes/Auth/ChangePassword';
import Info from '@/routes/Auth/Info';
import ProductDetail from '@/routes/ProductDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 */}
        <Route path="/" element={<Home />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 내 정보 */}
        <Route
          path="/myaccount"
          element={<ProtectedRoute element={<MyAccount />} />}
        >
          <Route path="info" element={<Info />} />
          <Route path="changename" element={<ChangeName />} />
          <Route path="changepw" element={<ChangePassword />} />
        </Route>

        {/* 관리자 */}
        <Route
          path="/admin"
          element={<ProtectedRoute adminRequired element={<Admin />} />}
        >
          <Route path="clients" element={<AdminClients />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>

        {/* 제품 */}
        <Route path="/products/:category" element={<Products />} />
        <Route
          path="/products/:category/:productId"
          element={<ProductDetail />}
        />

        {/* 계좌 👉 내정보 라우트로 들어갈 예정 */}
        <Route path="/account" element={<AccountPage />}>
          {/* <Route path="connectAccount" element={<ConnectAccount />} /> */}
          <Route path="accountList" element={<AccountList />} />
          {/* <Route path="deleteAccount" element={<DeleteAccount />} /> */}
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
