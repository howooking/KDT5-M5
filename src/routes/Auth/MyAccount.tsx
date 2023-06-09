import SubNavbar from '../../components/SubNavbar';
import { SUB_MENUS_MYACCOUNT } from '../../constants/constants';
import { userStore } from '../../store';

export default function MyAccount() {
  const { userInfo } = userStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      <SubNavbar menus={SUB_MENUS_MYACCOUNT} sub />
      <div className="container">
        <div className="img">{userInfo?.user.profileImg}</div>
        <label htmlFor="profileImgBase64">프로필사진 변경</label>
        <input
          id="profileImgBase64"
          type="file"
          name="profileImgBase64"
          onChange={handleChange}
        />
      </div>
      <h1>{userInfo?.user.displayName}</h1>
    </>
  );
}
