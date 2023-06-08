import { deleteProduct } from '../../api/adminApi';

const DeleteProduct: React.FC<ProductId> = ({ productId }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      console.log('제품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h3>제품 삭제</h3>
      <button onClick={handleDelete}>제품 삭제하기</button>
    </div>
  );
};

export default DeleteProduct;
