/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/store';
import { signIn } from '@/api/authApi';
import { ADMINS, EMAIL_REGEX } from '@/constants/constants';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionTitle from '@/components/ui/SectionTitle';
import toast from 'react-hot-toast';

export default function Login() {
  // 전역 로컬 유저를 세팅해주는 함수
  const { setUser } = userStore();

  //로그인 후 직전의 페이지로 이동하기 위해
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // form이벤트의 기본 새로고침을 막음
    event.preventDefault();

    // 이메일과 비밀번호를 입력하지 않은경우
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      toast.error('이메일 또는 비밀번호를 입력해주세요.', { id: 'login' });
      return;
    }

    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(loginData.email)) {
      toast.error('올바른 이메일을 입력해주세요.', { id: 'login' });
      return;
    }

    // 통신 시작
    setIsSending(true);
    toast.loading('로그인 중', { id: 'login' });
    const res = await signIn(loginData);

    // 로그인 성공
    if (res.statusCode === 200) {
      const user = res.data as UserResponseValue;
      // 어드민 여부 확인(보안상 매우 안좋음)
      const isAdmin = ADMINS.includes(user.user.email);
      // // 로컬 저장소에 user정보와 isAdmin을 문자열화시켜서 저장
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin }));
      // 로컬 user의 상태도 저장
      setUser({ ...user, isAdmin });
      setIsSending(false);
      navigate(-1);
      toast.success(isAdmin ? '주인님 오셨습니다!👸👸' : res.message, {
        id: 'login',
      });
      return;
    }

    // 로그인 실패
    const errorMessage = res.message;
    toast.error(errorMessage, { id: 'login' });
    setIsSending(false);
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-96 flex-col">
        <SectionTitle text="로그인" />
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-3">
            <Input
              placeholder="이메일 (관리자 admin@naver.com)"
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
            <Input
              placeholder="비밀번호 (11111111)"
              name="password"
              onChange={handleChange}
              type="password"
              value={loginData.password}
            />
          </div>
          <div className="flex gap-3">
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '로그인'}
              disabled={isSending}
              submit
            />
            <Button
              text="회원가입"
              secondary
              onClick={() => navigate('/signup')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
