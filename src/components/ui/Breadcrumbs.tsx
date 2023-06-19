import { DICTIONARY_SHOES } from '@/constants/constants';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  category?: string;
  brand?: string;
  name?: string;
}

export default function Breadcrumbs({
  category,
  brand,
  name,
}: BreadcrumbsProps) {
  return (
    <>
      {category ? (
        <div className="flex gap-1 text-xs text-gray-500">
          <div>
            <Link to="/">크레이지 11</Link>
          </div>
          <div>
            <Link to={`/products/${category}`}>
              {` / ${DICTIONARY_SHOES[category]}`}
            </Link>
          </div>
          <div>{brand ? ` / ${brand}` : ''}</div>
          <div>{name ? ` / ${name}` : ''}</div>
        </div>
      ) : (
        <Link to="/" className="flex gap-1 text-xs text-gray-500">
          크레이지 11
        </Link>
      )}
    </>
  );
}
