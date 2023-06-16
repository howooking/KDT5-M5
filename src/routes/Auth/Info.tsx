import { useState } from 'react';
import ImageUpload from '@/components/ui/ImageUpload';
import ProfileImage from '@/components/ui/ProfileImage';
import { userStore } from '@/store';
import Button from '@/components/ui/Button';
import AlertMessage from '@/components/ui/AlertMessage';
import { editUser } from '@/api/authApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Info() {
  const { authMe } = userStore();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { userInfo } = userStore();
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');
  const [positive, setPositive] = useState(false);
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
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setPositive(false);
    if (profileImage === '') {
      setMessage('파일을 선택해 주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    setIsSending(true);
    const res = await editUser(userInfo?.accessToken as string, {
      profileImgBase64: profileImage,
    });
    if (typeof res === 'string') {
      setMessage(res);
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      setIsSending(false);
      return;
    }
    setPositive(true);
    setMessage('변경 완료');
    setIsSending(false);
    setProfileImage('');
    authMe();
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-96 flex-col items-center gap-3 text-gray-700">
        <ProfileImage src={userInfo?.user.profileImg} />
        <h2 className="py-5 text-3xl font-bold">
          {userInfo?.user.displayName}
        </h2>
        <ImageUpload korName="변경할 이미지" onChange={handleChange} />
        <AlertMessage message={message} positive={positive} />
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
