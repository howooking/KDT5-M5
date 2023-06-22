import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '@/api/adminApi';
import { Link } from 'react-router-dom';
import ProductBar from '@/components/product/ProductBar';
import ProductCard from '@/components/product/ProductCard';
import Skeleton from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';

interface ProductSectionProps {
  category?: string;
  related?: boolean;
  productId?: string;
  productTitle?: string;
}

export default function ProductSection({
  category,
  related,
  productId,
  productTitle,
}: ProductSectionProps) {
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
    setIsLoading(true);
    async function fetchData() {
      const res = await getProducts();
      if (res.statusCode === 200) {
        // 카테고리에 따라서 products을 setting
        const categoryFilteredProducts = (res.data as Product[]).filter(
          (product) => (category ? product.tags[0] === category : product)
        );
        setProducts(categoryFilteredProducts);

        // 스켈레톤의 갯수를 미리 알기 위해 로컬저장소에 각 카테고리별 상품수를 저장
        localStorage.setItem(
          category ? category : 'all',
          JSON.stringify(categoryFilteredProducts.length)
        );
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      toast.error(res.message, { id: 'getProducts' });
    }
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
      {/* ProductDetail 컴포넌트에서 related 옵션을 props로 전달할 경우 */}
      {related ? (
        <SectionTitle text={`"${productTitle}"와 유사한 상품`} />
      ) : (
        <ProductBar
          selectedBrand={brand}
          category={category}
          brand={brand}
          productNumber={filteredProducts?.length}
          handleBrand={handleBrand}
          handleSortByPrice={handleSortByPrice}
        />
      )}

      <ul className="grid grid-cols-5 gap-10">
        {isLoading ? (
          <>
            {skeletonLength.map((_el, inex) => (
              <Skeleton key={inex} />
            ))}
          </>
        ) : (
          <>
            {related // ProductDetail 컴포넌트에서 related 옵션을 props로 전달할 경우
              ? sortedFilteredProducts
                  ?.filter((product) => product.id !== productId) // 자기 자신을 제외
                  .sort(() => Math.random() - 0.5) // 순서 섞어서 추천 알고리즘 처럼 보이게
                  .slice(0, 10) // 상위 10개만 보여줌
                  .map((product) => (
                    <li
                      key={product.id}
                      className={`group cursor-pointer p-2 shadow-md`}
                    >
                      <Link to={`/products/${product.tags[0]}/${product.id}`}>
                        <ProductCard
                          key={product.id}
                          isSoldOut={product.isSoldOut}
                          title={product.title}
                          discountRate={product.discountRate}
                          price={product.price}
                          thumbnail={product.thumbnail}
                        />
                      </Link>
                    </li>
                  ))
              : sortedFilteredProducts?.map((product) => (
                  <li
                    key={product.id}
                    className={`group cursor-pointer p-2 shadow-md`}
                  >
                    <Link to={`/products/${product.tags[0]}/${product.id}`}>
                      <ProductCard
                        key={product.id}
                        isSoldOut={product.isSoldOut}
                        title={product.title}
                        discountRate={product.discountRate}
                        price={product.price}
                        thumbnail={product.thumbnail}
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
