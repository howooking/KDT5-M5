export function priceBeforeDiscount(price: number, discountRate: number) {
  return (
    Math.ceil((price * 100) / (100 - discountRate) / 1000) * 1000
  ).toLocaleString('ko-KR');
}
