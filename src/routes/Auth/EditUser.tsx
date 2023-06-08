/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import Button from '../../components/ui/Button';

function EditUser() {
  const { userInfo, authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);

  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editData, setEditData] = useState({
    displayName: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editData.displayName.trim() === '') {
      setEditData({
        ...editData,
        displayName: userInfo?.user.displayName as string,
      });
    }
    if (
      editData.newPassword.trim() === '' ||
      editData.oldPassword.trim() === ''
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
    const res = await editUser(userInfo?.accessToken, editData);
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    authMe();
    // myaccount 페이지로 이동하기
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleName = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsEdit((prev) => !prev);
  };

  // 수정모드시 바로 input에 포커싱
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="displayName">이름:</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={editData.displayName}
          onChange={handleChange}
          placeholder={userInfo?.user.displayName}
          disabled={!isEdit}
          ref={inputRef}
        />
        <button onClick={handleName}>{isEdit ? '완료' : '수정'}</button>
      </div>
      <div>
        <label htmlFor="oldPassword">기존 비밀번호:</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={editData.oldPassword}
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
      <h1>{message}</h1>
      <button>저장</button>
    </form>
  );
}

export default EditUser;
