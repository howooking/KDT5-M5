import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

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
      editData.newPassword.trim() === '' ||
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="newpassword">이전 비밀번호</label>
      <input
        onChange={handleChange}
        type="password"
        id="oldPassword"
        name="oldPassword"
        value={editData.oldPassword}
      />
      <label htmlFor="newpassword">변경할 비밀번호</label>
      <input
        onChange={handleChange}
        type="password"
        id="newPassword"
        name="newPassword"
        value={editData.newPassword}
      />
      <label htmlFor="checktopw">변경할 비밀번호 확인</label>
      <input onChange={ctp} type="password" id="checktopw" value={checktopw} />
      {message}
      <button>완료</button>
    </form>
  );
}
