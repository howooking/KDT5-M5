/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { userStore } from '../../store';
import SubNavbar from '../../components/SubNavbar';
import { SUB_MENUS_ADMIN } from '../../constants/constants';
import { Outlet } from 'react-router-dom';

export default function Admin() {
  const { authMe } = userStore();

  useEffect(() => {
    authMe();
  }, []);

  return (
    <div className="flex flex-col">
      <SubNavbar menus={SUB_MENUS_ADMIN} sub />
      <Outlet />
    </div>
  );
}
