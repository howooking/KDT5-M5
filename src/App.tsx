import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import Login from '@/routes/Login';
import Admin from '@/routes/admin/Admin';
import AddProduct from '@/routes/admin/AddProduct';
import ProtectedRoute from '@/routes/ProtectedRoute';
import MyAccount from '@/routes/myAccount/MyAccount';
import AdminClients from '@/routes/admin/AdminClients';
import ChangeName from '@/routes/myAccount/ChangeName';
import ChangePassword from '@/routes/myAccount/ChangePassword';
import Info from '@/routes/myAccount/Info';
import AdminProduct from '@/routes/admin/AdminProducts';
import ConnectBankAccount from '@/routes/myAccount/bank/ConnectBankAccount';
import Products from '@/routes/Products';
import ProductDetail from '@/routes/ProductDetail';
import BankAccounts from '@/routes/myAccount/bank/BankAccounts';
import SearchProducts from '@/routes/SearchProducts';
import OrderList from '@/routes/myAccount/OrderList';
import AllTransactions from '@/routes/admin/AllTransactions';
import OrderDetail from '@/routes/myAccount/OrderDetail';
import EditProduct from '@/routes/admin/EditProduct';
import LogoutNeededRoute from '@/routes/LogoutNeededRoute';
import SignUp from '@/routes/SignUp';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 */}
        <Route path="/" element={<Home />} />
        <Route path="/products/search" element={<SearchProducts />} />
        <Route path="/products/:category" element={<Products />} />
        <Route
          path="/products/:category/:productId"
          element={<ProductDetail />}
        />
        {/* 로그인 */}
        <Route
          path="/login"
          element={<LogoutNeededRoute element={<Login />} />}
        />
        {/* 회원가입 */}
        <Route
          path="/signup"
          element={<LogoutNeededRoute element={<SignUp />} />}
        />
        {/* 내 정보 */}
        <Route
          path="/myaccount"
          element={<ProtectedRoute element={<MyAccount />} />}
        >
          <Route path="info" element={<Info />} />
          <Route path="changename" element={<ChangeName />} />
          <Route path="changepw" element={<ChangePassword />} />
          <Route path="accountList" element={<BankAccounts />} />
          <Route path="connectAccount" element={<ConnectBankAccount />} />
          <Route path="orderList" element={<OrderList />} />
          <Route path="order/:detailId" element={<OrderDetail />} />
        </Route>
        {/* 관리자 */}
        <Route
          path="/admin"
          element={<ProtectedRoute adminRequired element={<Admin />} />}
        >
          {/*유저관리*/}
          <Route path="clients" element={<AdminClients />} />
          {/*상품관리*/}
          <Route path="products" element={<AdminProduct />} />
          {/*상품추가*/}
          <Route path="addProduct" element={<AddProduct />} />
          {/*상품수정*/}
          <Route path="editProduct" element={<EditProduct />} />
          {/*거래내역*/}
          <Route path="alltransactions" element={<AllTransactions />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
