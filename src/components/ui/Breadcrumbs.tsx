import { DICTIONARY_SHOES } from '@/constants/constants';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  category?: string;
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
  return (
    <>
      {category ? (
        <div className="flex gap-3 divide-x divide-solid text-gray-500">
          <div>
            <Link to="/">크레이지 11</Link>
          </div>
          <div className="pl-3">
            <Link to={`/products/${category}`}>
              {category ? DICTIONARY_SHOES[category] : ''}
            </Link>
          </div>
        </div>
      ) : (
        <>크레이지 11</>
      )}
    </>
  );
}
