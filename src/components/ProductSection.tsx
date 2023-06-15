import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '@/api/adminApi';
import { Link } from 'react-router-dom';
import ProductBar from '@/components/ProductBar';
import ProductCard from '@/components/ProductCard';
import Skeleton from '@/components/ui/Skeleton';

interface ProductSectionProps {
  category?: string;
}

export default function ProductSection({ category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState('all');
  const [sortByPrice, setSortByPrice] = useState('');

  // 가격 정렬 선택
  const handleSortByPrice = (sort: string) => {
    setSortByPrice(sort);
  };

  // 브랜드 선택
  const handleBrand = (brandValue: string) => {
    setBrand(brandValue);
  };

  useEffect(() => {
    setBrand('all');
    async function fetchData() {
      const res = await getProducts();
      // return 값이 없는경우(상품조회에 실패한 경우)
      // 일단은 아무 작업도 안함.. 나중에 기능 추가 할 수도 있지만 안할듯
      if (!res) {
        return;
      }
      // 카테고리에 따라서 products을 setting
      const categoryFilteredProducts = res.filter((product) =>
        category ? product.tags[0] === category : product
      );
      setProducts(categoryFilteredProducts);

      // 스켈레톤의 갯수를 미리 알기 위해 로컬저장소에 각 카테고리별 상품수를 저장
      localStorage.setItem(
        category ? category : 'all',
        JSON.stringify(categoryFilteredProducts.length)
      );
      setIsLoading(false);
    }
    setIsLoading(true);
    fetchData();
  }, [category]);

  // 로컬 저장소에 카테고리별 상품 갯수를 가져옴 / 없는 경우 10개
  const skeletonLength = new Array(
    JSON.parse(localStorage.getItem(category ? category : 'all') ?? '10')
  ).fill(0);

  // 필터링 완료된 상품들
  const filteredProducts = useMemo(
    () =>
      products?.filter((product) =>
        brand === 'all' ? product : product.tags[1] === brand
      ),
    [brand, products]
  );
  // 가격순 sorting
  const sortedFilteredProducts = useMemo(
    () =>
      filteredProducts?.sort((a, b) =>
        sortByPrice === 'lowPrice' ? a.price - b.price : b.price - a.price
      ),
    [filteredProducts, sortByPrice]
  );

  return (
    <section className="container mx-auto px-20 py-10">
      <ProductBar
        selectedBrand={brand}
        category={category}
        productNumber={filteredProducts?.length}
        handleBrand={handleBrand}
        handleSortByPrice={handleSortByPrice}
      />
      <ul className="grid grid-cols-5 gap-10">
        {isLoading ? (
          <>
            {skeletonLength.map((_el, inex) => (
              <Skeleton key={inex} />
            ))}
          </>
        ) : (
          <>
            {sortedFilteredProducts?.map((product) => (
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
