import { useState } from 'react';
import { userStore } from '../../store';
import { editUser } from '../../api/authApi';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ChangePassword() {
  const [positive, setPositive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const { userInfo } = userStore();
  const [editData, setEditData] = useState({
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
  });

  // 서버와 전송상태에 따라 버튼의 상태를 바꿔주기 위해서 스테이트 지정
  // 에러메세지 타임아웃
  
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPositive(false);

    // 이전 타임아웃이 아직 작동중이 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    // 변경전 비번, 변경 후 비번 입력 안했을 때
    setIsSending(false);
    if (
      editData.newPassword.trim() === '' ||
      editData.oldPassword.trim() === ''
    ) {
      setMessage('비밀번호를 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    // 변경 비번 확인
    if (editData.checkPassword !== editData.newPassword) {
      setMessage('변경 할 비밀번호가 일치하지 않습니다.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    // 변경 비번 길이 수
    if (editData.newPassword.length <= 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    setIsSending(true);
    const res = await editUser(userInfo?.accessToken as string, {
      newPassword: editData.newPassword,
      oldPassword: editData.oldPassword,
    });

    if (typeof res === 'string') {
      setMessage(res);
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      setIsSending(false);
      return;
    }
    setPositive(true);
    setMessage('비밀번호를 수정하였습니다.');
    setIsSending(false);
    setEditData({
      oldPassword: '',
      newPassword: '',
      checkPassword: '',
    })
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-1/2 mt-10">
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
      <Button
        text={isSending ? <LoadingSpinner color="white" /> : '비밀번호 변경'}
        disabled={isSending}
      />
    </form>
  );
}