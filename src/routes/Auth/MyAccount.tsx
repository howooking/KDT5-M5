import { Outlet } from 'react-router-dom';
import SubNavbar from '../../components/SubNavbar';
import { SUB_MENUS_MYACCOUNT } from '../../constants/constants';

export default function MyAccount() {
  return (
    <>
      <SubNavbar menus={SUB_MENUS_MYACCOUNT} gray />
      <Outlet />
    </>
  );
}
