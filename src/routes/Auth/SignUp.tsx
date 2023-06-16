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

  // 서버와 전송상태에 따라 버튼의 상태를 바꿔주기 위해서 스테이트 지정
  const [isSending, setIsSending] = useState(false);
  // 에러메세지 타임아웃
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
    // form이벤트의 기본 새로고침을 막음
    event.preventDefault();

    // 이전 타임아웃이 아직 작동중인경우 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    //// 클라이언트 사이드 유효성 검사

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
      toast.error('이름은 20자 이하로 작성해주세요.', {
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

    setIsSending(true);
    const res = await signUp(signUpData);
    // 회원가입에 성공하는 경우
    if (res.statusCode === 200) {
      const user = res.data as UserResponseValue;
      toast.success(`${user.user.displayName}님 즐거운 쇼핑 되세요!`, {
        id: 'signUp',
      });
      localStorage.setItem('user', JSON.stringify(res));
      setUser({ ...user, isAdmin: false });
      setIsSending(true);
      navigate('/', { replace: true });
      return;
    }
    // 기타오류, 이미 등록된 이메일 or 유효성 오류 or apikey오류
    const errorMessage = res.data as string;
    toast.error(errorMessage, {
      id: 'signUp',
    });
    setIsSending(false);
  };

  return (
    <div className="flex justify-center p-20">
      <div className="flex w-[436px] flex-col">
        <SectionTitle text="회원가입" />
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <div>
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '회원가입'}
              disabled={isSending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
