import { PRODUCT_SORT } from '@/constants/constants';

interface SortOptionsProps {
  handleSortByPrice: (brandValue: string) => void;
}

export default function ProductSortOptions({
  handleSortByPrice,
}: SortOptionsProps) {
  return (
    <div className="flex gap-3 divide-x divide-solid text-gray-500">
      {PRODUCT_SORT.map((sort) => (
        <div
          key={sort.value}
          className="cursor-pointer pl-3 hover:text-gray-900"
          onClick={() => handleSortByPrice(sort.value)}
        >
          {sort.name}
        </div>
      ))}
    </div>
  );
}
