import SubNavbar from '../../components/SubNavbar';
import { SUB_MENUS_MYACCOUNT } from '../../constants/constants';
import EditUser from './EditUser';

export default function MyAccount() {
  return (
    <>
      <SubNavbar menus={SUB_MENUS_MYACCOUNT} />
      <EditUser />
    </>
  );
}
