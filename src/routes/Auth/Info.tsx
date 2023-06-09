import Input from '../../components/ui/Input';
import { userStore } from '../../store';

export default function Info() {
  const { userInfo } = userStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
  };
  return (
    <>
      <div className="container">
        <div className="aline-center flex justify-center">
          <img
            className="w-40 rounded-full"
            src={userInfo?.user.profileImg || '/defaultProfile.jpg'}
          ></img>
        </div>
        <div className="mx-auto w-1/2">
          <label htmlFor="profileImgBase64">프로필사진 변경</label>
          <Input
            // id="profileImgBase64"
            type="file"
            name="profileImgBase64"
            onChange={handleChange}
          />
        </div>
      </div>
      <h1 className='mx-auto w-1/2'>{userInfo?.user.displayName}</h1>
    </>
  );
}
