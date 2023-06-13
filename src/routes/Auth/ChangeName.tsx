/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ChangeName() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { authMe, userInfo } = userStore();

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

    // 이전 타임아웃이 아직 작동중이 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (editData.displayName.trim() === '') {
      setMessage('변경 할 닉네임를 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    if (editData.displayName.trim() === userInfo?.user.displayName) {
      setMessage('원래 닉네임과 동일합니다.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    if (editData.displayName.length > 20) {
      setMessage('닉네임은 20자 이하로 작성해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    setIsSending(true);
    const res = await editUser(userInfo?.accessToken as string, editData);
    if (typeof res === 'string') {
      setMessage(res);
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      setIsSending(false);
      return;
    }
    setIsSending(false);
    navigate('/myaccount/info', { replace: true });
    authMe();
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
        <Button
          text={isSending ? <LoadingSpinner color="white" /> : '닉네임 변경'}
          disabled={isSending}
        />
      </form>
    </div>
  );
}
