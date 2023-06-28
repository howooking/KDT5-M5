import { priceBeforeDiscount } from '@/lib/ceilPrice';

interface ProductCardProps {
  title: string;
  price: number;
  thumbnail: string | null;
  discountRate: number;
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
      <img
        src="/soldout.png"
        alt="soldout"
        className={`${isSoldOut ? '' : 'hidden'} absolute inset-0`}
      />
    </div>
  );
}
