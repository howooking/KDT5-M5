import { getProductDetail } from '@/api/adminApi';
import SectionTitle from '@/components/ui/SectionTitle';
import { DICTIONARY_SHOES } from '@/constants/constants';
import { priceBeforeDiscount } from '@/constants/library';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetail>();

  useEffect(() => {
    const fetchProductDetail = async () => {
      const res = await getProductDetail(productId as string);
      if (res) {
        setProduct(res);
      }
    };
    fetchProductDetail();
  }, [productId]);

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

  return (
    <div className="container mx-auto px-20">
      <div className="py-4 text-sm text-gray-500">
        <Link to="/">크레이지11 /</Link>
        <Link to={`/products/${product?.tags[0]}`}>
          {' '}
          {DICTIONARY_SHOES[product?.tags[0] as string]} /
        </Link>
        <Link to=""> {product?.tags[1].toUpperCase()} / </Link>
        <span>{product?.title}</span>
      </div>
      <div className="flex gap-10">
        <div className="flex-1">
          {/* 이미지 */}
          <img
            src={product?.thumbnail || '/defaultThumb.jpg'}
            alt="썸네일 이미지"
            className="pl-[140px]"
          />
        </div>
        <div className="flex-1">
          {/* 내용 */}
          <div className="py-10 text-2xl font-bold">{product?.title}</div>
          <div className="flex items-center gap-8">
            <span className="text-3xl text-red-500 ">
              {product?.price.toLocaleString('ko-KR')}원
            </span>
            <span className="text-xl text-gray-500 line-through">
              {priceBeforeDiscount(
                product?.price as number,
                product?.discountRate as number
              )}
              원
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-400">
              {product?.discountRate}%
            </span>
          </div>
        </div>
      </div>

      <div className="divider" />
      <SectionTitle text="상세 이미지" />
      <img
        src={product?.photo || '/defaultThumb.jpg'}
        alt="상세 이미지"
        className="mx-auto"
      />
      <div>{product?.isSoldOut}</div>
    </div>
  );
}
