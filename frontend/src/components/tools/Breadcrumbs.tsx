import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '@/components/icons/icons';

interface BreadcrumbProps {
  items: { name: string; path: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-base font-bold" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <FontAwesomeIcon icon={icons.faChevronRight} className="mx-3 text-[--principal-red]" />}
            <Link 
              href={item.path}
              className="text-[--gray] hover:text-[--principal-blue]">
                {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;