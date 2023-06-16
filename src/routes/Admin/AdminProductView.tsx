import React, { useEffect, useState } from 'react';
import {
  deleteProduct,
  getProductDetail,
  getProducts,
} from '@/api/adminApi.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button.tsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.tsx';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

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
    const res = await getProductDetail(target.value);
    setDetailProduct(res);
    // 승원님 상세페이지 완성시 상세페이지에 연결 예정
    window.productModal.showModal();
  };
  const handleUpdate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLInputElement;
    const productId: string = target.value;
    const product = products?.find((p) => p.id === productId);
    navigator('/admin/editproduct', {
      state: { productId, productTitle: product?.title },
    });
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const Id = event.target as HTMLInputElement;
    const result = window.confirm('정말로 삭제 하시겠습니까?');
    if (result){
      await deleteProduct(Id.value);
      alert('제품이 성공적으로 삭제되었습니다.');
      setProducts(products?.filter((product) => product.id !== Id.value));
    }
  };
  // 리로드 기능 수정 완료

  return (
    <section className={'mx-auto w-[90%] text-[15px]'}>
      <div className={'m-4 border-2 border-red-300'}>
        <h2 className={'mb-8 mt-10 text-center text-2xl'}>
          {loading ? <LoadingSpinner color={'accent'} /> : '전체 상품 조회'}
        </h2>
        <div className={'divider'} />
        <table
          className={
            'table-zebra mx-auto table w-[80%] table-fixed text-center align-middle text-xl'
          }
        >
          <thead>
            <tr className={'bold text-center text-2xl'}>
              <th>썸네일이미지</th>
              <th>상품명</th>
              <th>상품가격</th>
              <th>상품설명</th>
              <th>카테고리</th>
              <th>브랜드</th>
              <th>매진여부</th>
              <th>할인율</th>
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
                  {/*줄임표시 호버하면 타이틀 출력 수정 완료*/}
                  <td>
                    <p
                      className={'... overflow-hidden truncate'}
                      title={product.title}
                    >
                      {product.title}
                    </p>
                  </td>
                  <td>{product.price} 원</td>
                  <td>
                    <p
                      className={'... overflow-hidden truncate'}
                      title={product.description}
                    >
                      {product.description}
                    </p>
                  </td>
                  <td>{product.tags[0]}</td>
                  <td>{product.tags[1]}</td>
                  <td className={'w-[100px]'}>
                    {product.isSoldOut ? '❌' : '⭕'}
                  </td>
                  <td className={'w-[100px]'}>{product.discountRate} %</td>
                  <td>
                    <Button
                      text={'상세조회'}
                      onClick={handleSearch}
                      value={product.id}
                      secondary={true}
                    />
                    {/*상세조회*/}
                    <Button
                      onClick={handleUpdate}
                      text={'상품수정'}
                      value={product.id}
                      secondary={true}
                    />
                    <Button
                      text={'상품삭제'}
                      onClick={handleDelete}
                      value={product.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
