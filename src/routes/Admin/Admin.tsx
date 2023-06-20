/* eslint-disable react-hooks/exhaustive-deps */
import SubNavbar from '@/components/SubNavbar';
import { SUB_MENUS_ADMIN } from '@/constants/constants';
import { userStore } from '@/store';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

export default function Admin() {
  const { authMe } = userStore();
  useEffect(() => {
    async function auth() {
      const errorMessage = await authMe();
      if (errorMessage) {
        toast.error(errorMessage, { id: 'authMe' });
      }
    }
    auth();
  }, []);
  return (
    <>
      <SubNavbar menus={SUB_MENUS_ADMIN} gray />
      <Outlet />
    </>
  );
}
