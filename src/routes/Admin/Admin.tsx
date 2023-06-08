import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userStore } from '../../store';
import SubNavbar from '../../components/SubNavbar';
import { SUB_MENUS_ADMIN } from '../../constants/constants';

export default function Admin() {
  const { authMe } = userStore();
  useEffect(() => {
    authMe();
  }, [authMe]);

  return (
    <div className="flex">
      <SubNavbar menus={SUB_MENUS_ADMIN} sub />
      <Outlet />
    </div>
  );
}
