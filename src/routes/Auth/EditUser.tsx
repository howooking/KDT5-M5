import { useState } from 'react';
import { userStore } from '../../store';
import { RequestEditUser } from '../../api/authApi';

function EditUser() {
  const { userInfo, setUser } = userStore();
  const [message, setMessage] = useState('');
  const [editData, setEditData] = useState({
    displayName: '',
    oldPassword: '',
    newPassword: '',
  });
console.log(editData);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      editData.newPassword.trim() === '' ||
      editData.displayName.trim() === ''
    ) {
      setMessage('이름, 비밀번호를 모두 입력해주세요');
      return;
    }
    
        // 이름 길이 유효성검사
        if (editData.displayName.length > 20) {
          setMessage('이름은 20자 이하로 작성해주세요');
          return;
        }
    // 비번 8자리 유효성검사
    if (editData.newPassword.length < 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요');
      return;
    }
    const res = await RequestEditUser(userInfo.accessToken, editData)

  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="displayName">이름:{userInfo.user.displayName}</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={editData.displayName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="newPassword">새로운 비밀번호:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={editData.newPassword}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">기존 비밀번호:</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={editData.oldPassword}
          onChange={handleChange}
        />
      </div>
      <h1>{message}</h1>
      <button>저장</button>
    </form>
  );
}

export default EditUser;
