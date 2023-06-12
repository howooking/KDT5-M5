import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getProduct, getProducts } from '@/api/adminApi';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>();
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(() => e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function fetchProductsDetail() {
      const res = await getProduct({ text });
      if (!res) {
        return;
      }
      setDetailProduct(res);
    }
    fetchProductsDetail();
    setText('');
  };

  useEffect(() => {
    async function fetchProducts() {
      const res = await getProducts();
      if (!res) {
        return;
      }
      setProducts(res);
    }
    fetchProducts();
  }, []);

  return (
    <div className={'mx-auto w-[60%] text-[20px]'}>
      <h1 className={'mt-4 text-3xl text-orange-400'}>
        Admin Product 조회 - 전체 리스트 grid 형태로 스타일링 예정
      </h1>
      <div className={' m-4'}>
        <h2 className={'mt-10 text-2xl'}>제품 전체 조회</h2>
        <div className={'divider'} />
        <ul
          className={'flex flex-col items-start border-4 border-amber-200 p-4 '}
        >
          {products?.map((product) => {
            return (
              <li key={product.id}>
                <span className={'m-2'}>ID : {product.id}</span>
                <span className={'m-2'}>상품명: {product.title}</span>
                <span className={'m-2'}>가 격: {product.price}</span>
                <span className={'m-2'}>설 명: {product.description}</span>
              </li>
            );
          })}
        </ul>
        <h2 className={'mt-10 text-2xl'}>제품 상세 조회</h2>
        <div className={'divider'} />
        <form
          className={'flex w-full bg-[#f5f5f5] px-[1rem] py-[1.4rem]'}
          onSubmit={handleSubmit}
        >
          <input
            className={
              'flex shrink grow basis-auto rounded-[8px] border-0 px-[1rem] py-[0.7rem] text-[1.4rem] outline-0'
            }
            type="text"
            placeholder="조회할 ID를 입력하세요"
            value={text}
            onChange={handleChange}
          />
          <button
            className={
              'btn btn-outline btn-accent bold ml-4 rounded-[8px] text-[1.4rem]'
            }
          >
            Add
          </button>
        </form>
        <div className={'m-4 text-[20px]'}>
          상품Id:{detailProduct?.title} 상품가격: {detailProduct?.price}{' '}
          상품설명: {detailProduct?.description}
        </div>
      </div>
    </div>
  );
}
