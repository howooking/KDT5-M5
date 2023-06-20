/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { userStore } from '@/store';
import { editUser } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ChangeName() {
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { authMe, userInfo } = userStore();
  const [editData, setEditData] = useState({
    displayName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editData.displayName.trim() === '') {
      toast.error('변경 할 닉네임를 입력해주세요.', { id: 'changeName' });
      return;
    }
    if (editData.displayName.trim() === userInfo?.user.displayName) {
      toast.error('원래 닉네임과 동일합니다.', { id: 'changeName' });
      return;
    }
    if (editData.displayName.length > 20) {
      toast.error('닉네임은 20자 이하로 작성해주세요', { id: 'changeName' });
      return;
    }

    setIsSending(true);
    toast.loading('닉네임 변경 중', { id: 'changeName' });
    const res = await editUser(userInfo?.accessToken as string, editData);
    if (res.statusCode === 200) {
      const updatedUser = res.data as UpdatedUserResponseValue;
      toast.success(`${updatedUser.displayName}(으)로 변경하였습니다.`, {
        id: 'changeName',
      });
      navigate('/myaccount/info');
      setIsSending(false);
      authMe();
      return;
    }
    toast.error(res.message, { id: 'changeName' });
    setIsSending(false);
  };

  return (
    <div className="container mx-auto px-20 py-4">
      <SectionTitle text="닉네임 변경" />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="my-20 flex w-96 flex-col gap-3"
        >
          <Input
            name="displayName"
            onChange={handleChange}
            placeholder={userInfo?.user.displayName}
            type="text"
            value={editData.displayName}
          />
          <Button
            submit
            text={isSending ? <LoadingSpinner color="white" /> : '닉네임 변경'}
            disabled={isSending}
          />
        </form>
      </div>
    </div>
  );
}
