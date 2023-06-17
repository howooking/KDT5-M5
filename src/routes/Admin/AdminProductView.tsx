import { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '@/api/adminApi.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button.tsx';
import SectionTitle from '@/components/ui/SectionTitle';
import { DICTIONARY_SHOES } from '@/constants/constants';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getProducts();
      if (res.statusCode === 200) {
        setProducts(res.data as Product[]);
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'getProducts' });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const toDetailPage = async (category: string, productId: string) => {
    navigate(`/products/${category}/${productId}`);
  };

  const handleUpdate = (productId: string, productTitle: string) => {
    navigate('/admin/editproduct', { state: { productId, productTitle } });
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    alert('상품이 성공적으로 삭제되었습니다.');
    setProducts(products?.filter((product) => product.id !== productId));
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="전체 상품 조회" />
          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>사진</th>
                <th>상품명</th>
                <th>상품가격(원)</th>
                <th>카테고리</th>
                <th>브랜드</th>
                <th>재고</th>
                <th>할인율</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => {
                return (
                  <tr>
                    <td>
                      <img src={product.thumbnail as string} alt="썸네일" />
                    </td>
                    <td>
                      <p className="line-clamp-1" title={product.title}>
                        {product.title}
                      </p>
                    </td>
                    <td>{product.price}</td>
                    <td>{DICTIONARY_SHOES[product.tags[0]]}</td>
                    <td>{product.tags[1].toUpperCase()}</td>
                    <td>{product.isSoldOut ? '❌' : '🔘'}</td>
                    <td>{product.discountRate} %</td>
                    <td>
                      <Button
                        text="상세조회"
                        onClick={() =>
                          toDetailPage(product.tags[0], product.id)
                        }
                        value={product.id}
                        secondary
                      />
                      <Button
                        onClick={() => handleUpdate(product.id, product.title)}
                        text="상품수정"
                        value={product.id}
                        secondary
                      />
                      <Button
                        text="상품삭제"
                        onClick={() => handleDelete(product.id)}
                        value={product.id}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
