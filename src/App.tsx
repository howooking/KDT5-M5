import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Products from './routes/Products';
import Login from './routes/Auth/Login';
import SignUp from './routes/Auth/SignUp';
import Admin from './routes/Admin/Admin';
import AddProduct from './routes/Admin/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import AccountList from './routes/Account/AccountList';
import AccountPage from './routes/Account/AccountPage';
import AdminProducts from './routes/Admin/AdminProducts.tsx';
import MyAccount from './routes/Auth/MyAccount';
import AdminClients from './routes/Admin/AdminClients.tsx';
import ChangeName from './routes/Auth/ChangeName.tsx';
import ChangePassword from './routes/Auth/ChangePassword.tsx';
import Info from './routes/Auth/Info.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<ProtectedRoute element={<Products />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myaccount" element={<MyAccount />}>
          <Route path="info" element={<Info />} />
          <Route path="changename" element={<ChangeName />} />
          <Route path="changepw" element={<ChangePassword />} />
        </Route>
        <Route
          path="/admin"
          element={<ProtectedRoute adminRequired element={<Admin />} />}
        >
          <Route path="clients" element={<AdminClients />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>
        <Route path="/account" element={<AccountPage />}>
          {/* <Route path="connectAccount" element={<ConnectAccount />} /> */}
          <Route path="accountList" element={<AccountList />} />
          {/* <Route path="deleteAccount" element={<DeleteAccount />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
