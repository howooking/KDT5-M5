import { useEffect, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { getProducts } from '@/api/adminApi';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import Skeleton from './ui/Skeleton';

interface ProductSectionProps {
  category?: string;
}

export default function ProductSection({ category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

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

      // 스켈레톤의 갯수를 미리 알기 위해 로컬저장소에 각 카테고리별 상품수를 저장
      localStorage.setItem(
        category ? category : 'all',
        JSON.stringify(filteredProducts.length)
      );

      setIsLoading(false);
    }
    setIsLoading(true);
    fetchData();
  }, [category]);

  // 로컬 저장소에 카테고리별 상품 갯수를 가져옴 / 없는 경우 10
  const skeletonLength = new Array(
    JSON.parse(localStorage.getItem(category ? category : 'all') ?? '10')
  ).fill(0);

  return (
    <section className="container mx-auto px-20">
      <SectionTitle text={category} />
      <ul className="grid grid-cols-5 gap-10">
        {isLoading ? (
          <>
            {skeletonLength.map((el, inex) => (
              <Skeleton key={inex} />
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </section>
  );
}
