import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/store';
import { signUp } from '@/api/authApi';
import { EMAIL_REGEX } from '@/constants/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ImageUpload from '@/components/ui/ImageUpload';
import SectionTitle from '@/components/ui/SectionTitle';
import toast from 'react-hot-toast';

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = userStore();

  const [signUpData, setSignData] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
    displayName: '',
    profileImgBase64: '',
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // 이미지 파일 다루는 로직
    if (name === 'profileImgBase64') {
      const files = event.target.files as FileList;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setSignData({ ...signUpData, [name]: reader.result as string });
      };
    }
    setSignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이메일 or 비밀번호 or 이름을 입력하지 않은경우
    if (
      signUpData.email.trim() === '' ||
      signUpData.password.trim() === '' ||
      signUpData.displayName.trim() === ''
    ) {
      toast.error('이메일, 비밀번호, 닉네임을 모두 입력해주세요.', {
        id: 'signUp',
      });
      return;
    }

    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(signUpData.email)) {
      toast.error('올바른 이메일을 입력해주세요.', {
        id: 'signUp',
      });
      return;
    }

    // 비번 8자리 유효성검사
    if (signUpData.password.length < 7) {
      toast.error('비밀번호를 8자리 이상 입력해주세요.', {
        id: 'signUp',
      });
      return;
    }

    // 이름 길이 유효성검사
    if (signUpData.displayName.length > 20) {
      toast.error('닉네임은 20자 이하로 작성해주세요.', {
        id: 'signUp',
      });
      return;
    }

    // 비밀번호 확인
    if (signUpData.password !== signUpData.passwordRepeat) {
      toast.error('비밀번호가 일치하지 않습니다.', {
        id: 'signUp',
      });
      return;
    }

    // 통신 시작
    setIsSending(true);
    toast.loading('회원가입 요청 중...', { id: 'signUp' });
    const res = await signUp(signUpData);
    // 회원가입에 성공하는 경우
    if (res.statusCode === 200) {
      const user = res.data as UserResponseValue;
      setIsSending(false);
      toast.success(`${user.user.displayName}님 즐거운 쇼핑 되세요!`, {
        id: 'signUp',
      });
      // 새로 가입하는 사람이 관리자일리 없음
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
      setUser({ ...user, isAdmin: false });
      navigate('/', { replace: true });
      return;
    }
    // 회원가입 실패
    toast.error(res.message, {
      id: 'signUp',
    });
    setIsSending(false);
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-96 flex-col">
        <SectionTitle text="회원가입" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-3">
            <Input
              placeholder="이메일*"
              name="email"
              onChange={handleChange}
              type="text"
              value={signUpData.email}
            />
            <Input
              placeholder="비밀번호* (8자이상)"
              name="password"
              onChange={handleChange}
              type="password"
              value={signUpData.password}
            />
            <Input
              placeholder="비밀번호 획인*"
              name="passwordRepeat"
              onChange={handleChange}
              type="password"
              value={signUpData.passwordRepeat}
            />
            <Input
              placeholder="닉네임* (20자 이하)"
              name="displayName"
              onChange={handleChange}
              type="displayName"
              value={signUpData.displayName}
            />
            <ImageUpload
              korName="프로필사진"
              name="profileImgBase64"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <Button
              submit
              text={isSending ? <LoadingSpinner color="white" /> : '회원가입'}
              disabled={isSending}
            />
            <Button
              text="로그인"
              secondary
              onClick={() => navigate('/login')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
