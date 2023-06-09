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
        <img src={userInfo?.user.profileImg || '/defaultProfile.jpg'}></img>
        <label htmlFor="profileImgBase64">프로필사진 변경</label>
        {/* <input
          id="profileImgBase64"
          type="file"
          name="profileImgBase64"
          onChange={handleChange}
        /> */}
      </div>
      <h1>{userInfo?.user.displayName}</h1>
    </>
  );
}
