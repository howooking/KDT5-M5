/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import SubNavbar from '@/components/SubNavbar';
import { SUB_MENUS_MYACCOUNT } from '@/constants/constants';
import { userStore } from '@/store';
import { useEffect } from 'react';

export default function MyAccount() {
  const { authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);

  return (
    <>
      <SubNavbar menus={SUB_MENUS_MYACCOUNT} gray />
      <Outlet />
    </>
  );
}
