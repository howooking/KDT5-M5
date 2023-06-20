import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductBar from '@/components/product/ProductBar';
import ProductCard from '@/components/product/ProductCard';
import { searchProducts } from '@/api/transactionApi';
import CrazyLoading from '@/components/ui/CrazyLoading';

export default function SearchProducts() {
  const { state: searchText } = useLocation();
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByPrice, setSortByPrice] = useState('');

  // 가격 정렬 선택
  const handleSortByPrice = (sort: string) => {
    setSortByPrice(sort);
  };

  useEffect(() => {
    async function fetchData() {
      setProducts([]);
      setMessage('');
      setIsLoading(true);
      const res = await searchProducts({ searchText: searchText });
      if (res.statusCode === 200) {
        const products = res.data as Product[];
        if (products.length === 0) {
          setMessage(`'${searchText}' 검색결과가 없습니다.`);
          setIsLoading(false);
          return;
        }
        setProducts(products);
        setIsLoading(false);
        return;
      }
      setMessage(res.message);
      setIsLoading(false);
    }
    fetchData();
  }, [searchText]);

  // 가격순 sorting
  const sortedSearchedProducts = useMemo(
    () =>
      products?.sort((a, b) =>
        sortByPrice === 'lowPrice' ? a.price - b.price : b.price - a.price
      ),
    [products, sortByPrice]
  );

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-10">
          <ProductBar
            searchText={searchText}
            productNumber={sortedSearchedProducts?.length}
            handleSortByPrice={handleSortByPrice}
          />
          <ul className="grid grid-cols-5 gap-10">
            {sortedSearchedProducts?.map((product) => (
              <li
                key={product.id}
                className={`group cursor-pointer p-2 shadow-md`}
              >
                <Link to={`/products/${product.tags[0]}/${product.id}`}>
                  <ProductCard
                    isSoldOut={product.isSoldOut}
                    key={product.id}
                    title={product.title}
                    discountRate={product.discountRate}
                    price={product.price}
                    thumbnail={product.thumbnail}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <span className="text-xl">{message}</span>
        </section>
      )}
    </>
  );
}
