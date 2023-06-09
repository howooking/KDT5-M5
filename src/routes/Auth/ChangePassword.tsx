import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { userInfo } = userStore();
  const [checktopw, setChecktopw] = useState('');
  const [editData, setEditData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //유효성 검사 1
    if (
      editData.newPassword.trim() === ''
      ||
      editData.oldPassword.trim() === ''
    ) {
      setMessage('비밀번호를 입력해주세요.');
      return;
    }
    if (editData.newPassword.length < 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요.');
      return;
    }
    if (checktopw !== editData.newPassword) {
      setMessage('변경 할 비밀번호가 일치하지 않습니다.');
    }
    //유효성 검사 2
    const res = editUser(userInfo?.accessToken, editData);
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    navigate('/myaccount/info', { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const ctp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecktopw(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-1/2">
      <Input
        onChange={handleChange}
        type="password"
        name="oldPassword"
        value={editData.oldPassword}
        placeholder="이전 비밀번호를 입력하세요."
      />
      <Input
        onChange={handleChange}
        type="password"
        name="newPassword"
        value={editData.newPassword}
        placeholder="변경할 비밀번호를 입력하세요."
      />
      <Input
        onChange={ctp}
        name="checktopw"
        type="password"
        value={checktopw}
        placeholder="변경할 비밀번호 확인"
      />
      {message}
      <Button text="수정" />
    </form>
  );
}
