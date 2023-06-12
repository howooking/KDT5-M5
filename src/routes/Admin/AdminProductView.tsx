import React, { useEffect, useState } from 'react';
import { getProducts, getProductDetail, deleteProduct } from '@/api/adminApi.ts';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[]>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res) {
          setProducts(res);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      const target = event.target.value as HTMLInputElement;
      const res = await getProductDetail({ text: target });
      console.log(target);
      setDetailProduct(res);
      //모달 show 방식 변경 - css class 추가 방식으로
    }catch (error){
      console.error(error);
    }
    window.productModal.showModal();
  };
  const handleUpdate = () => {
    console.log(detailProduct);
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await deleteProduct(event.target.value);
      alert('제품이 성공적으로 삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다.');
    }
  };

// 컴포넌트로 나누는 중
  return (
    <section className={'mx-auto w-[90%] text-[15px]'}>

      <div className={'m-4 border-2 border-red-300'}>
        <h2 className={'mb-8 mt-10 text-2xl'}>제품 전체 조회</h2>
        <div className={'divider'} />
        <div>
         <div
           className={'btn btn-primary'}
         >
           제품추가</div>
        </div>
        <div className={'divider'} />
        <table
          className={
            'table-zebra mx-auto table w-[80%] table-fixed text-xl align-middle text-center'
          }
        >
          <thead>
          <tr className={'bold text-center text-2xl'}>
            {/*<th >제품ID</th>*/}
            <th>썸네일이미지</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>상품설명</th>
            <th>제품테그</th>
            <th>매진여부</th>
            <th>할인율</th>
          </tr>
          </thead>
          <tbody>
          {products?.map((product) => {
            return (
              <tr className={'p-2'}>
                {/*<td>{product.id}</td>*/}
                <td>
                  <img
                    src={product.thumbnail}
                    // src={image}
                    className={'w-[100px]'}
                    alt='썸네일'
                  />
                </td>
                <td>
                  <p className={'... overflow-hidden truncate'}>
                    {product.title}
                  </p>
                </td>
                <td>{product.price} 원</td>
                <td>
                  <p className={'... overflow-hidden truncate'}>
                    {product.description}
                  </p>
                </td>
                <td>{product.tags}</td>
                <td className={'w-[100px]'}>{product.isSoldOut ? '재고 없음' : '재고 있슴'}</td>
                <td className={'w-[100px]'}>{product.discountRate} %</td>
                <td>
                  <button
                    className={'btn-primary btn pb-0 text-xl mb-1'}
                    onClick={handleSearch}
                    value={product.id}
                  >
                    상세조회
                  </button>
                  <button
                    className={'btn text-xl btn-info mb-1'}
                    onClick={handleUpdate}
                    value={product.id}
                  >
                    상품수정
                  </button>
                  <button
                    className={'btn-accent btn text-xl'}
                    onClick={handleDelete}
                    value={product.id}
                  >
                    상품삭제
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

      {/*모달부분*/}
      <div>
        <dialog id='productModal' className={`modal`}>
          <form
            method='dialog'
            className='modal-box h-auto w-[60%] max-w-5xl text-[20px] '
          >
            <h3 className='text-lg font-bold'>제품상세조회</h3>
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
            <div className='flex flex-col mb-2'>
              <span > 상품 설명 :</span>
              {detailProduct?.description}
              <img src={detailProduct?.photo} alt='상세사진' />
            </div>
            <div className={'divider'} />
            <form method='dialog' className='modal-backdrop'>
              <button>close</button>
            </form>
          </form>
        </dialog>
      </div>
    </section>
  )
}
