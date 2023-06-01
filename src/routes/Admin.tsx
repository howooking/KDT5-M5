import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';

const Admin = () => {
  return (
    <div>
      <h2>관리자 패널</h2>
      <AddProduct />
      <UpdateProduct productId={123} /> 
      <DeleteProduct productId={456} /> 
    </div>  
  );
};

export default Admin;
