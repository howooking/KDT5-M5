/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import { signIn } from '../../api/authApi';
import { ADMINS, EMAIL_REGEX } from '../../constants/constants';
import Input from '../../components/ui/Input';
import AlertMessage from '../../components/ui/AlertMessage';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Login() {
  const { setUser } = userStore();

  //로그인 후 직전의 페이지로 이동하기 위해
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  // 에러메세지 타임아웃
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // 로그인 과정 사용자와 상호작용
  const [message, setMessage] = useState(' ');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // form이벤트의 기본 새로고침을 막음
    event.preventDefault();

    // 이전 타임아웃이 아직 작동중인 경우 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    //// 클라이언트 사이드 유효성 검사

    // 이메일과 비밀번호를 입력하지 않은경우
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      setMessage('이메일 또는 비밀번호를 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(loginData.email)) {
      setMessage('올바른 이메일을 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    setIsSending(true);
    const res = await signIn(loginData);
    if (res.statusCode === 200) {
      const user = res.data as UserResponseValue;
      // 어드민 여부 확인(보안상 매우 안좋음)
      const isAdmin = ADMINS.includes(user.user.email);
      // // 로컬 저장소에 user정보와 isAdmin을 문자열화시켜서 저장
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin }));
      // 로컬 user의 상태도 저장
      setUser({ ...user, isAdmin });
      setIsSending(false);
      navigate('/', { replace: true });
      return;
    }

    // 기타오류, 없는 이메일 or 비번 입력 오류 or 유효성 오류 or apikey오류
    const errorMessage = res.data as string;
    setMessage(errorMessage);
    const id = setTimeout(() => {
      setMessage('');
    }, 2000);
    setTimeoutId(id);
    setIsSending(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-[436px] flex-col">
        <SectionTitle text="로그인" />
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="space-y-3">
            <Input
              placeholder="이메일"
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
            <Input
              placeholder="비밀번호"
              name="password"
              onChange={handleChange}
              type="password"
              value={loginData.password}
            />
            <AlertMessage message={message} />
          </div>
          <div>
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '로그인'}
              disabled={isSending}
            />
            <Link to="/signup">
              <Button text="회원가입" secondary />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
