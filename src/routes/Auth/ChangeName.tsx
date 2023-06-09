import { useEffect, useState} from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function ChangeName() {
  const navigate = useNavigate();
  const { userInfo, authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  
  const [message, setMessage] = useState('');
  const [editData, setEditData] = useState({
    displayName: '',
    oldPassword: '',
  });

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //유효성 검사1
    if (editData.displayName.trim() === '') {
      setEditData({
        ...editData,
        displayName: userInfo?.user.displayName as string,
      });
    }
    if (editData.displayName.length > 20) {
      setMessage('닉네임은 20자 이하로 작성해주세요');
      return;
    }
    if (editData.oldPassword.trim() === '') {
      setMessage('비밀번호를 입력해 주세요');
      return;
    }
    //유효성 검사2
    const res = await editUser(userInfo?.accessToken, editData);
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    navigate('/myaccount', { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="displayName">닉네임 : </label>
      <input
        onChange={handleChange}
        id="displayName"
        type="text"
        name="displayname"
        value={editData.displayName}
        placeholder={userInfo?.user.displayName}
      />
      <label htmlFor="oldpassword">비밀번호</label>
      <input
        onChange={handleChange}
        id="oldpassword"
        type="password"
        name="oldpassword"
        value={editData.oldPassword}
      />
      <h1>{message}</h1>
      <button>완료</button>
    </form>
  );
}
