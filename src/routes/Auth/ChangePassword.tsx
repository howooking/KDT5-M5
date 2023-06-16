import { useState } from 'react';
import { userStore } from '@/store';
import { editUser } from '@/api/authApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ChangePassword() {
  const [isSending, setIsSending] = useState(false);
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

    // 이전 타임아웃이 아직 작동중이 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    // 변경전 비번, 변경 후 비번 입력 안했을 때
    if (
      editData.newPassword.trim() === '' ||
      editData.oldPassword.trim() === ''
    ) {
      toast.error('비밀번호를 입력해주세요.', { id: 'changePassword' });
      return;
    }
    // 변경 비번 확인
    if (editData.checkPassword !== editData.newPassword) {
      toast.error('변경 할 비밀번호가 일치하지 않습니다.', {
        id: 'changePassword',
      });
      return;
    }
    // 변경 비번 길이 수
    if (editData.newPassword.length <= 7) {
      toast.error('비밀번호를 8자리 이상 입력해주세요.', {
        id: 'changePassword',
      });
      return;
    }

    setIsSending(true);
    toast.loading('비밀번호 수정 중', {
      id: 'changePassword',
    });
    const res = await editUser(userInfo?.accessToken as string, {
      newPassword: editData.newPassword,
      oldPassword: editData.oldPassword,
    });

    if (res.statusCode === 200) {
      const updatedUser = res.data as UpdatedUserResponseValue;
      toast.success(
        `${updatedUser.displayName}님의 비밀번호가 변경되었습니다.`,
        {
          id: 'changePassword',
        }
      );
      setEditData({
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
      });
      setIsSending(false);
      return;
    }
    const errorMessage = res.message;
    toast.error(errorMessage, {
      id: 'changePassword',
    });
    setIsSending(false);
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
        <Button
          text={isSending ? <LoadingSpinner color="white" /> : '비밀번호 변경'}
          disabled={isSending}
        />
      </form>
    </div>
  );
}
