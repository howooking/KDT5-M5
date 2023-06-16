import React, { useEffect, useState } from 'react';
import {
  deleteProduct,
  getProductDetail,
  getProducts,
} from '@/api/adminApi.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button.tsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.tsx';
import SectionTitle from '@/components/ui/SectionTitle';
import { DICTIONARY_SHOES } from '@/constants/constants';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();
      if (res) {
        setProducts(res);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    const res = await getProductDetail(target.value);
    setDetailProduct(res);
  };
  const handleUpdate = (productId: string, productTitle: string) => {
    navigate('/admin/editproduct', { state: { productId, productTitle } });
  };
  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    alert('상품이 성공적으로 삭제되었습니다.');
    setProducts(products?.filter((product) => product.id !== productId));
  };
  // 리로드 기능 수정 완료

  return (
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
              <tr className={'p-2'}>
                <td>
                  <img
                    src={product.thumbnail as string}
                    className={'w-[100px]'}
                    alt="썸네일"
                  />
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
                    onClick={handleSearch}
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
      {/*승원님 상세페이지 완성시 모달 지우고 상세페이지와 연결 예정*/}
      {/*모달부분*/}
      <div>
        <dialog id="productModal" className={`modal`}>
          <form
            method="dialog"
            className="modal-box h-auto w-[60%] max-w-5xl text-[20px] "
          >
            <h3 className="text-lg font-bold">제품상세조회</h3>
            <div className={'mb-2'}>
              <span>제품 이름 : </span>
              {detailProduct?.title}
            </div>
            <div className={'mb-2'}>
              <span>제품 가격 : </span>
              {detailProduct?.price} 원
            </div>
            <div className={'mb-2'}>
              <span>상품 매진 : </span>
              {detailProduct?.isSoldOut ? '재고 없슴' : '재고 있슴'}
            </div>
            <div className={'mb-2'}>
              <span>상품할인률 : </span>
              {detailProduct?.discountRate} %
            </div>
            <div className="mb-2 flex flex-col">
              <span> 상품 설명 :</span>
              {detailProduct?.description}
              <img src={detailProduct?.photo as string} alt="상세사진" />
            </div>
          </form>
          <div className={'divider'} />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      ;
    </section>
  );
}
