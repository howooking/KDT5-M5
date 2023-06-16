import { useState } from 'react';
import ImageUpload from '@/components/ui/ImageUpload';
import ProfileImage from '@/components/ui/ProfileImage';
import { userStore } from '@/store';
import Button from '@/components/ui/Button';
import { editUser } from '@/api/authApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Info() {
  const { authMe } = userStore();
  const { userInfo } = userStore();
  const [profileImage, setProfileImage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
  };

  // 프로필 사진 변경 통신 로직
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 이전 타임아웃이 아직 작동중이 초기화

    if (profileImage === '') {
      toast.error('변경할 이미지를 선택해주세요.', { id: 'profile' });

      return;
    }

    setIsSending(true);
    toast.loading('프로필 사진 변경 중', { id: 'profile' });
    const res = await editUser(userInfo?.accessToken as string, {
      profileImgBase64: profileImage,
    });
    if (res.statusCode === 200) {
      const updatedUser = res.data as UpdatedUserResponseValue;
      toast.success(`${updatedUser.displayName}님! 사진 멋져요!😁😁`, {
        id: 'profile',
      });
      setIsSending(false);
      setProfileImage('');
      authMe();
      return;
    }
    const errorMessage = res.message;
    toast.error(errorMessage, { id: 'profile' });
    setIsSending(false);
    setProfileImage('');
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-96 flex-col items-center gap-3 text-gray-700">
        <ProfileImage src={userInfo?.user.profileImg} />
        <h2 className="py-5 text-3xl font-bold">
          {userInfo?.user.displayName}
        </h2>
        <ImageUpload korName="변경할 이미지" onChange={handleChange} />
        <Button
          text={
            isSending ? <LoadingSpinner color="white" /> : '프로필사진 변경'
          }
          disabled={isSending}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
