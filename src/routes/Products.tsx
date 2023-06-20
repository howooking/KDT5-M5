import { Navigate, useParams } from 'react-router-dom';
import ProductSection from '@/components/product/ProductSection';

export default function Products() {
  const { category } = useParams();

  if (category && ['soccer', 'footsal', 'sneakers'].includes(category)) {
    return <ProductSection category={category} />;
  }
  // 임의로 카테고리를 입력하여 이동하려고 하는 경우
  return <Navigate to="/" replace />;
}
