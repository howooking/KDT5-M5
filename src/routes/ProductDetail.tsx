import { getProductDetail } from '@/api/adminApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetail>();
console.log(product)
  useEffect(() => {
    const fetchProductDetail = async () => {
        const res = await getProductDetail(productId as string);
        if (res){
          setProduct(res);
        }
    };
    fetchProductDetail();
  }, [productId]);

  const getKoreanTag = (tag: string | undefined) => {
    if (tag === 'soccer') {
      return '축구화';
    } else if (tag === 'footsal') {
      return '풋살화';
    } else if (tag === 'sneakers') {
      return '스니커즈';
    } else {
      return tag;
    }
  };

  const getTagLink = (tag: string | undefined) => {
    if (tag === 'soccer') {
      return '/products/soccer';
    } else if (tag === 'footsal') {
      return '/products/footsal';
    } else if (tag === 'sneakers') {
      return '/products/sneakers';
    } else {
      return '/';
    }
  };

  const getbrand = (tag: string | undefined) => {
    if (tag === 'nike') {
      return '나이키';
    } else if (tag === 'adidas') {
      return '아디다스';
    } else if (tag === 'mizno') {
      return '미즈노';
    } else if (tag === 'puma') {
      return '푸마';
    }
  };

  return (
    <>
    {/* <div>{productId}</div> */}
    <a className="text-gray-500 ml-[100px]" href="/">크레이지11 / </a>
    <a className='text-gray-500' href={getTagLink(product?.tags[0])}>
      {getKoreanTag(product?.tags[0])} / </a>
    <a className='text-gray-500' href="">{getbrand(product?.tags[1])} / </a>
    <span className='text-gray-500'> {product?.title} </span>
    <div className='text-xl pl-[750px] font-bold'>{product?.title}</div>
    <div className="text-3xl text-red-500 ml-[750px] ">{product?.price.toLocaleString()} 원</div>
    <div className="text-xl ml-[900px] gap-9 rounded-full w-16 h-16 flex items-center justify-center bg-gray-300">{product?.discountRate}%</div>
    <div>{product?.tags}</div>
    <img src={product?.thumbnail || "/defaultThumb.jpg"} alt="썸네일 이미지" className="pl-[140px]" />
    <img src={product?.photo || "/defaultThumb.jpg"} alt="상세 이미지" className="mx-auto" />
    <div>{product?.isSoldOut}</div>
  </>
  
  );
}
