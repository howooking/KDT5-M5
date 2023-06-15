import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import Login from '@/routes/Auth/Login';
import SignUp from '@/routes/Auth/SignUp';
import Admin from '@/routes/Admin/Admin';
import AddProduct from '@/routes/Admin/AddProduct';
import ProtectedRoute from '@/components/ProtectedRoute';
import MyAccount from '@/routes/Auth/MyAccount';
import AdminClients from '@/routes/Admin/AdminClients';
import ChangeName from '@/routes/Auth/ChangeName';
import ChangePassword from '@/routes/Auth/ChangePassword';
import Info from '@/routes/Auth/Info';
import AdminProductView from '@/routes/Admin/AdminProductView';
import EditProduct from '@/routes/Admin/EditProduct';
import ConnectAccount from '@/routes/Account/ConnectAccount';
import Products from '@/routes/Products';
import ProductDetail from '@/routes/ProductDetail';
import AccountList from '@/routes/Account/AccountList';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route
          path="/products/:category/:productId"
          element={<ProductDetail />}
        />

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
          <Route path="accountList" element={<AccountList />} />
          <Route path="connectAccount" element={<ConnectAccount />} />
        </Route>

        {/* 관리자 */}
        <Route
          path="/admin"
          element={<ProtectedRoute adminRequired element={<Admin />} />}
        >
          <Route path="clients" element={<AdminClients />} />
          <Route path="products" element={<AdminProductView />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="editProduct" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
