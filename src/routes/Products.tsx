import { useParams } from 'react-router-dom';
import ProductSection from '../components/ProductSection';

export default function Products() {
  const { category } = useParams();
  return <ProductSection category={category} />;
}
