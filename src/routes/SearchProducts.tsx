import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductBar from '@/components/ProductBar';
import ProductCard from '@/components/ProductCard';
import Skeleton from '@/components/ui/Skeleton';
import { searchProducts } from '@/api/transactionApi';

export default function SearchProducts() {
  const { state: searchText } = useLocation();
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [sortByPrice, setSortByPrice] = useState('');

  // 가격 정렬 선택
  const handleSortByPrice = (sort: string) => {
    setSortByPrice(sort);
  };

  useEffect(() => {
    async function fetchData() {
      setMessage('');
      const res = await searchProducts({ searchText: searchText.trim() });
      if (res.statusCode === 200) {
        const products = res.data as Product[];
        if (products.length === 0) {
          setProducts(products);
          setMessage(`'${searchText}' 검색결과가 없습니다.`);
          setIsLoading(false);
          return;
        }
        setProducts(products);
        setIsLoading(false);
        return;
      }
      setMessage(res.data as string);
      setProducts([]);
      setIsLoading(false);
    }
    setIsLoading(true);
    fetchData();
  }, [searchText]);

  const skeletonLength = new Array(5).fill(0);

  // 가격순 sorting
  const sortedSearchedProducts = useMemo(
    () =>
      products?.sort((a, b) =>
        sortByPrice === 'lowPrice' ? a.price - b.price : b.price - a.price
      ),
    [products, sortByPrice]
  );

  return (
    <section className="container mx-auto px-20 py-10">
      <ProductBar
        searchText={searchText}
        selectedBrand=""
        productNumber={sortedSearchedProducts?.length}
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
            {sortedSearchedProducts?.map((product) => (
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
      <span className="text-2xl">{message}</span>
    </section>
  );
}
