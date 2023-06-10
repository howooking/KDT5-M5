import { useEffect, useState } from 'react';
import SectionTitle from './ui/SectionTitle';
import { getProducts } from '../api/adminApi';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

interface ProductSectionProps {
  category?: string;
}

export default function ProductSection({ category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      if (!res) {
        return;
      }
      const filteredProducts = res.filter((product) =>
        category ? product.tags[0] === category : product
      );
      setProducts(filteredProducts);
    }
    fetchData();
  }, [category]);

  return (
    <section className="container mx-auto px-20">
      <SectionTitle text={category} />
      <ul className="grid grid-cols-5 gap-10">
        {products?.map((product) => (
          <li
            className={`p-2 ${
              product.isSoldOut ? 'opacity-20' : ''
            } cursor-pointer shadow-md`}
          >
            <Link to={`/products/${product.tags[0]}/${product.id}`}>
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
