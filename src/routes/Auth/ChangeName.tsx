/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';

export default function ChangeName() {
  const navigate = useNavigate();

  const { userInfo } = userStore();
  const [message, setMessage] = useState('');
  const [editData, setEditData] = useState({
    displayName: '',
    // oldPassword: '',
  });
  console.log(editData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //유효성 검사1
    if (editData.displayName.trim() === '') {
      setMessage('변경할 아이디를 입력해주세요.');
      return;
    }
    if (editData.displayName === userInfo?.user.displayName) {
      setMessage('원래 아이디와 동일합니다.');
      return;
    }
    if (editData.displayName.length > 20) {
      setMessage('닉네임은 20자 이하로 작성해주세요');
      return;
    }

    const res = await editUser(userInfo?.accessToken as string, editData);
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    navigate('/myaccount/info', { replace: true });
  };

  return (
    <div className="flex justify-center p-20">
      <form onSubmit={handleSubmit} className="flex w-96 flex-col gap-3">
        <Input
          name="displayName"
          onChange={handleChange}
          placeholder={userInfo?.user.displayName}
          type="text"
          value={editData.displayName}
        />
        <AlertMessage message={message} />
        <Button text={'닉네임 변경'} />
      </form>
    </div>
  );
}
