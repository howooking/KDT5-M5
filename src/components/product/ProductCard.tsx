import { priceBeforeDiscount } from '@/constants/library';

interface ProductCardProps {
  title: string; // 제품 이름
  price: number; // 제품 가격
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  discountRate: number; // 제품 할인율
  isSoldOut: boolean;
}

export default function ProductCard({
  discountRate,
  price,
  thumbnail,
  title,
  isSoldOut,
}: ProductCardProps) {
  return (
    <div className={`text-sm ${isSoldOut ? 'opacity-50' : ''} relative`}>
      <img
        src={thumbnail || `/products/dummy.jpg`}
        alt={title}
        className={`p-1 duration-300 ${
          isSoldOut ? '' : 'group-hover:scale-105'
        }`}
      />
      <h3 className="line-clamp-2" title={title}>
        {title}
      </h3>
      <div className="flex gap-2">
        <span className="text-accent">{price.toLocaleString('ko-KR')}원</span>
        <span
          className={`text-gray-500 line-through ${
            discountRate ? '' : 'hidden'
          }`}
        >
          {priceBeforeDiscount(price, discountRate)}원
        </span>
      </div>
      <div className={`${isSoldOut ? '' : 'hidden'}`}>
        <img src="/soldout.png" alt="soldout" className="absolute inset-0" />
      </div>
    </div>
  );
}
