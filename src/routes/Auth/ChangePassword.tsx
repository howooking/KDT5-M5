import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';

export default function ChangePassword() {
  const [positive, setPositive] = useState(false);
  const [message, setMessage] = useState('');
  const { userInfo } = userStore();
  const [editData, setEditData] = useState({
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
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
    // 변경전 비번, 변경 후 비번 입력 안했을 때
    setPositive(false);
    if (
      editData.newPassword.trim() === '' ||
      editData.oldPassword.trim() === ''
    ) {
      setMessage('비밀번호를 입력해주세요.');
      return;
    }
    // 변경 비번 확인
    if (editData.checkPassword !== editData.newPassword) {
      setMessage('변경 할 비밀번호가 일치하지 않습니다.');
      return;
    }
    // 변경 비번 길이 수
    if (editData.newPassword.length <= 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요.');
      return;
    }

    const res = await editUser(userInfo?.accessToken as string, {
      newPassword: editData.newPassword,
      oldPassword: editData.oldPassword,
    });
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    setMessage('비밀번호를 수정하였습니다.');
    setPositive(true);
  };

  return (
    <div className="flex justify-center p-20">
      <form onSubmit={handleSubmit} className="flex w-96 flex-col gap-3">
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
          onChange={handleChange}
          name="checkPassword"
          type="password"
          value={editData.checkPassword}
          placeholder="변경할 비밀번호 확인"
        />
        <AlertMessage message={message} positive={positive} />

        <Button text="수정" />
      </form>
    </div>
  );
}
