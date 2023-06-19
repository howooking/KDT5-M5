import { Link } from 'react-router-dom';
interface SubNavbarProps {
  menus: {
    label: string;
    href: string;
  }[];
  gray?: boolean;
}

export default function SubNavbar({ menus, gray }: SubNavbarProps) {
  return (
    <nav
      className={`relative z-50 flex h-12 ${
        gray ? 'bg-gray-600' : 'bg-accent'
      } w-full`}
    >
      <ul className="container mx-auto flex items-center gap-20 px-20 text-sm">
        {menus.map((menu) => (
          <li key={menu.label}>
            <Link to={menu.href} className="font-bold text-white">
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
