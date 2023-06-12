// import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { getFetchProducts, getFetchProductDetail } from '../../api/adminApi.ts';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[]>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getFetchProducts();
        console.log(res);
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLInputElement; // HTMLInputElement으로 형변환
    const res = await getFetchProductDetail({ text: target.value });
    setDetailProduct(res);
    //모달 show 방식 변경 - css class 추가 방식으로
    window.productModal.showModal();
  };
  const handleUpdate = () => {
    console.log(detailProduct);
  };
  const handleDelete = () => {
    console.log(detailProduct);
  };

  return (
    <section className={'mx-auto w-[90%] text-[15px]'}>

      <div className={'m-4 border-2 border-red-300'}>
        <h2 className={'mb-8 mt-10 text-2xl'}>제품 전체 조회</h2>
        <div className={'divider'} />
        <div>
          <button className={'btn-info btn mr-4 w-[200px] text-2xl'}>
            제품 추가
          </button>
        </div>
        <div className={'divider'} />
        <table
          className={
            'table-zebra mx-auto table w-[90%] table-fixed border-spacing-4 text-center text-xl'
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
                    alt="썸네일"
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
                <td className={'w-[100px]'}>{product.isSoldOut}</td>
                <td className={'w-[100px]'}>{product.discountRate}</td>
                <td className={'flex gap-2 justify-center p-0'}>
                <button
                  className={'btn-primary btn pb-0 text-xl'}
                  onClick={handleSearch}
                  value={product.id}
                >
                  조회
                </button>
                <button className={'btn text-xl'} onClick={handleUpdate}>
                  수정
                </button>
                <button
                  className={'btn-info btn text-xl'}
                  onClick={handleDelete}
                >
                  삭제
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
        <dialog id="productModal" className="modal">
          <form
            method="dialog"
            className="modal-box h-auto w-[60%] max-w-5xl text-[20px]"
          >
            <h3 className="text-lg font-bold">제품상세조회</h3>
            <div className={'m-4 flex flex-col items-start justify-center'}>
              <label htmlFor={'thumbnail'} className={'mb-2'}>
                제품 이름 :{'  '}
                <input
                  type="text"
                  value={detailProduct?.title}
                  className={
                    'input-bordered input-accent input w-[600px] text-xl'
                  }
                  name={'thumbnail'}
                />
              </label>
              <label htmlFor={'price'} className={'mb-2'}>
                제품 가격 :{'  '}
                <input
                  type="text"
                  value={detailProduct?.price}
                  className={
                    'input-bordered input-accent input w-[100px] text-xl'
                  }
                  name={'price'}
                />{' '}
                원
              </label>
              <label htmlFor={'soldOut'} className="label cursor-pointer">
                상품 매진 :{' '}
                <input
                  type="checkbox"
                  checked={detailProduct?.isSoldOut}
                  name={'soldOut'}
                  className="checkbox"
                />
              </label>
              <label htmlFor={'discountRate'} className="label cursor-pointer">
                할인률 :{' '}
                <input
                  type="text"
                  value={detailProduct?.discountRate}
                  name={'discountRate'}
                  className="input-bordered input-accent input w-[100px] text-xl"
                />
                %
              </label>
            </div>
            <div className={'flex flex-col items-center justify-center'}>
              <textarea
                value={detailProduct?.description}
                className={'textarea-accent textarea w-[80%]  text-xl'}
              />
              <img src={detailProduct?.photo} alt="상세사진" />
            </div>
          </form>
          <div className={'divider'} />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </section>
  );
}
