// React 18버젼 이후로 React import필요없습니다.
import React, { useEffect, useState } from 'react';
import {
  getProducts,
  getProductDetail,
  deleteProduct,
} from '@/api/adminApi.ts';

export default function AdminProductView() {
  const [products, setProducts] = useState<Product[]>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();

  useEffect(() => {
    // 화살표 함수 사용하셔도 되는데 전체적인 통일성을 위해 async function으로 해주면 좋겠습니다.
    const fetchProducts = async () => {
      // 예외처리는 api파일에서 하기 때문에 굳이 여기에서 하실 필요 없습니다.
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

  // 모달 부분은 제품 상세페이지(승원님 파트)를 재사용하면 되기 때문에 승원님 완성이 된 후 하도록 하겠습니다.
  const handleSearch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const target = event.target.value as HTMLInputElement;
      const res = await getProductDetail({ text: target });
      console.log(target);
      setDetailProduct(res);
      //모달 show 방식 변경 - css class 추가 방식으로
    } catch (error) {
      console.error(error);
    }
    window.productModal.showModal();
  };

  // 업데이트 페이지로 이동하며 state를 전달하면 될것 같아요.(따로 설명드릴게요)
  const handleUpdate = () => {
    console.log(detailProduct);
  };

  // 파라미터로 productId를 받을 수 있습니다.
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // 예외처리는 api파일에서, confirm이 있으면 좋겠습니다.
    try {
      await deleteProduct(event.target.value);
      alert('제품이 성공적으로 삭제되었습니다.');
      // 새로고침을 안하고 하는게 좋습니다.
      // products를 states로 갖고 있습니다.
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
          <div className={'btn-primary btn'}>제품추가</div>
        </div>
        <div className={'divider'} />
        <table
          className={
            'table-zebra mx-auto table w-[80%] table-fixed text-center align-middle text-xl'
          }
        >
          <thead>
            <tr className={'bold text-center text-2xl'}>
              {/*<th >제품ID</th>*/}
              <th>썸네일이미지</th>
              <th>상품명</th>
              <th>상품가격</th>
              {/* 설명은 불필요해보입니다. */}
              <th>상품설명</th>
              {/* 태그를 카테골와 브랜드로 나눠서 표시 */}
              <th>제품테그</th>
              <th>매진여부</th>
              <th>할인율</th>
            </tr>
          </thead>
          <tbody>
            {/* return 생략 가능 */}
            {products?.map((product) => {
              return (
                <tr className={'p-2'}>
                  {/*<td>{product.id}</td>*/}
                  <td>
                    <img
                      // default 백업 이미지
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
                  <td className={'w-[100px]'}>
                    {product.isSoldOut ? '재고 없음' : '재고 있슴'}
                  </td>
                  <td className={'w-[100px]'}>{product.discountRate} %</td>
                  <td>
                    {/* 디자인 통일성을 위해 커스텀 버튼컴포넌트 활용 */}
                    <button
                      className={'btn-primary btn mb-1 pb-0 text-xl'}
                      onClick={handleSearch}
                      value={product.id}
                    >
                      상세조회
                    </button>
                    <button
                      className={'btn-info btn mb-1 text-xl'}
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
              <img src={detailProduct?.photo} alt="상세사진" />
            </div>
            <div className={'divider'} />
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </form>
        </dialog>
      </div>
    </section>
  );
}
