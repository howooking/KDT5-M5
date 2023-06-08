import { Link } from 'react-router-dom';
import React from 'react';
interface SubNavbarProps {
  menus: {
    label: string;
    href: string;
  }[];
  sub?: boolean;
}

export default function SubNavbar({ menus, sub }: SubNavbarProps) {
  return (
    <nav className={`flex h-12 ${sub ? 'bg-gray-700' : 'bg-accent'} w-full`}>
      <ul className="container mx-auto flex items-center gap-20 px-20">
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
