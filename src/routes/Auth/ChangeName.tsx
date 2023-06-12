/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ChangeName() {
  const [positive, setpositive] = useState(false)
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, []);

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
      setMessage('아이디를 입력해주세요.');
      return;
    }
    if (editData.displayName.length > 20) {
      setMessage('닉네임은 20자 이하로 작성해주세요');
      return;
    }
    // if (editData.oldPassword.trim() === '') {
    //   setMessage('비밀번호를 입력해 주세요');
    //   return;
    // }
    //유효성 검사2
    setIsSending(true);
    const res = await editUser(userInfo?.accessToken as string, editData);
    if (typeof res === 'string') {
      setMessage(res);
    setIsSending(false);
      return;
    }
    setpositive(true)
    setIsSending(false);
    navigate('/myaccount/info', { replace: true });
    authMe();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-1/2 mt-10">
      <Input
        name="displayName"
        onChange={handleChange}
        placeholder={userInfo?.user.displayName}
        type="text"
        value={editData.displayName}
      />
      {/* <Input
        type="password"
        name="oldPassword"
        value={editData.oldPassword}
        onChange={handleChange}
        placeholder="비밀번호"
      /> */}
      <AlertMessage message={message} positive={positive}/>
      <Button
        text={isSending ? <LoadingSpinner color="white" /> : '닉네임 변경'}
        disabled={isSending}
      />
    </form>
  );
}