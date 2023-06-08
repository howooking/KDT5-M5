import { useEffect, useState } from 'react';
import SectionTitle from './ui/SectionTitle';
import { getProducts } from '../api/adminApi';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      if (!data) {
        return;
      }
      setProducts(data);
    }
    fetchData();
  }, []);
  console.log(products);

  return (
    <section className="container mx-auto px-20">
      <SectionTitle text="신상품 초이스" />
      <ul className="grid grid-cols-5 gap-10">
        {products?.map((product) => (
          <li
            className={`p-2 ${
              product.isSoldOut ? 'opacity-20' : ''
            } cursor-pointer shadow-md`}
          >
            <Link to={`/products/${product.id}`}>
              <ProductCard
                key={product.id}
                title={product.title}
                discountRate={product.discountRate}
                price={product.price}
                thumbnail={product.thumbnail}
                tags={product.tags}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
