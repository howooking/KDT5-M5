import { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '@/api/adminApi.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button.tsx';
import SectionTitle from '@/components/ui/SectionTitle';
import { DICTIONARY_SHOES } from '@/constants/constants';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
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

  const toDetailPage = (category: string, productId: string) => {
    navigate(`/products/${category}/${productId}`);
  };

  const toEditPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    productTitle: string
  ) => {
    // 버튼을 눌렀을 때 상세 페이지로 가지 않기 위해
    event.stopPropagation();
    // 상세 페이지로 state를 전달하는 방법은 두가지가 있습니다.
    // 1. "/admin/editproduct/:productId"와 같이 url로 보내는 방법
    // 2. history api의 state를 이용하는 방법, 이 방법을 사용하겠습니다.
    navigate('/admin/editproduct', { state: { productId, productTitle } });
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    productTitle: string
  ) => {
    event.stopPropagation();
    if (confirm(`${productTitle}를 삭제하시겠습니까?`)) {
      toast.loading(`${productTitle} 삭제 중...`, {
        id: 'deleteProduct',
      });
      const res = await deleteProduct(productId);
      if (res.statusCode === 200) {
        toast.success(`${productTitle}를 삭제하였습니다.`, {
          id: 'deleteProduct',
        });
        setProducts(products?.filter((product) => product.id !== productId));
        return;
      }
      toast.error(res.message, { id: 'deleteProduct' });
    }
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="상품 관리" />
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
                  <tr
                    onClick={() => toDetailPage(product.tags[0], product.id)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <td>
                      <img
                        src={product.thumbnail || '/defaultThumb.jpg'}
                        alt={product.title}
                      />
                    </td>
                    <td>
                      <p className="line-clamp-1" title={product.title}>
                        {product.title}
                      </p>
                    </td>
                    <td>{product.price.toLocaleString('ko-KR')}</td>
                    <td>{DICTIONARY_SHOES[product.tags[0]]}</td>
                    <td>{product.tags[1].toUpperCase()}</td>
                    <td>{product.isSoldOut ? '❌' : '🔘'}</td>
                    <td>{product.discountRate}%</td>
                    <td className="space-y-2">
                      <Button
                        onClick={(event) =>
                          toEditPage(event, product.id, product.title)
                        }
                        text="상품 수정"
                        value={product.id}
                        secondary
                      />
                      <Button
                        text="상품 삭제"
                        onClick={(event) =>
                          handleDelete(event, product.id, product.title)
                        }
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
