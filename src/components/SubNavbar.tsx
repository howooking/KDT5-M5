import { Link } from 'react-router-dom';

interface SubNavbarProps {
  menus: {
    label: string;
    href: string;
  }[];
}

export default function SubNavbar({ menus }: SubNavbarProps) {
  return (
    <nav className="bg-accent h-12 flex">
      <ul className="flex container mx-auto px-20 gap-20 items-center">
        {menus.map((menu) => (
          <li key={menu.label}>
            <Link to={menu.href} className="text-white font-bold">
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
