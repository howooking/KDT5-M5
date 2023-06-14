import { DICTIONARY_SHOES, PRODUCT_BRAND } from '@/constants/constants';
import Breadcrumbs from './ui/Breadcrumbs';
import SectionTitle from './ui/SectionTitle';
import SortOptions from './SortOptions';
import Button from './ui/Button';

interface ProductBarProps {
  category?: string;
  productNumber?: number;
  handleBrand: (brandValue: string) => void;
  selectedBrand: string;
  handleSortByPrice: (brandValue: string) => void;
}

export default function ProductBar({
  category,
  productNumber,
  handleBrand,
  selectedBrand,
  handleSortByPrice,
}: ProductBarProps) {
  return (
    <div className="mb-10">
      <SectionTitle text={category ? DICTIONARY_SHOES[category] : '모든제품'} />
      <div className="flex justify-between text-xs">
        <Breadcrumbs category={category} />
        <div className="flex gap-3">
          <SortOptions handleSortByPrice={handleSortByPrice} />
          <span>총 {productNumber ?? '0'} 개</span>
        </div>
      </div>
      <div className="divider my-0 mt-2" />
      <div className="flex gap-10">
        {PRODUCT_BRAND.map((brand) => (
          <Button
            key={brand.value}
            text={brand.name}
            secondary={brand.value === selectedBrand ? false : true}
            onClick={() => handleBrand(brand.value)}
          />
        ))}
      </div>
    </div>
  );
}
