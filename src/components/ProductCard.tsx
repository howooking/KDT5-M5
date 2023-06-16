interface ProductCardProps {
  title: string; // 제품 이름
  price: number; // 제품 가격
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  discountRate: number; // 제품 할인율
}

export default function ProductCard({
  discountRate,
  price,
  thumbnail,
  title,
}: ProductCardProps) {
  const priceBeforeDiscount =
    Math.ceil((price * 100) / (100 - discountRate) / 1000) * 1000;
  return (
    <div className="text-sm">
      <img
        src={thumbnail || `/products/dummy.jpg`}
        alt={title}
        className="p-1 duration-300 group-hover:scale-105"
      />
      <h3>{title}</h3>
      <div className="flex gap-2">
        <span className="text-accent">{price}원</span>
        <span
          className={`text-gray-500 line-through ${
            discountRate ? '' : 'hidden'
          }`}
        >
          {priceBeforeDiscount.toFixed(0)}원
        </span>
      </div>
    </div>
  );
}
