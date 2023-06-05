import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Products from './routes/Products';
import Login from './routes/Auth/Login';
import SignUp from './routes/Auth/SignUp';
import Admin from './routes/Admin/Admin';
import AddProduct from './routes/Admin/AddProduct';
import DeleteProduct from './routes/Admin/DeleteProduct';
import UpdateProduct from './routes/Admin/UpdateProduct';
import UserCheck from './routes/Admin/UserCheck';
import ProtectedRoute from './components/ProtectedRoute';
import EditUser from './routes/Auth/EditUser';
import MyAccount from './routes/Auth/Myaccount';

function App() {
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
        <Route path='/myaccount' element={<MyAccount/>} />
        <Route
          path="/admin"
          element={<ProtectedRoute adminRequired element={<Admin />} />}
        >
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="deleteProduct" element={<DeleteProduct />} />
          <Route path="updateProduct" element={<UpdateProduct />} />
          <Route path="userCheck" element={<UserCheck />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
