import { useEffect, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { getProducts } from '@/api/adminApi';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';

interface ProductSectionProps {
  category?: string;
}

export default function ProductSection({ category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      // return 값이 없는경우(상품조회에 실패한 경우)
      // 일단은 아무 작업도 안함.. 나중에 기능 추가
      if (!res) {
        return;
      }
      // 카테고리에 따라서 products을 setting
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
            key={product.id}
            className={`p-2 ${
              product.isSoldOut ? 'opacity-20' : ''
            } group cursor-pointer shadow-md`}
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
