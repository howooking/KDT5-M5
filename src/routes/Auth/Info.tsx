import { useState } from 'react';
import ImageUpload from '../../components/ui/ImageUpload';
import ProfileImage from '../../components/ui/ProfileImage';
import { userStore } from '../../store';
import Button from '../../components/ui/Button';

export default function Info() {
  const { userInfo } = userStore();
  const [profileImage, setProfileImage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
  };

  const handleSubmit = () => {
    // 프로필 사진 변경 통신 로직
    console.log(profileImage);
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-96 flex-col items-center gap-3 text-gray-700">
        <ProfileImage src={userInfo?.user.profileImg} />
        <h2 className="py-5 text-3xl font-bold">
          {userInfo?.user.displayName}
        </h2>
        <ImageUpload korName="변경할 이미지" onChange={handleChange} />
        <Button text="프로필사진 변경" onClick={handleSubmit} />
      </div>
    </div>
  );
}
