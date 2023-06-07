import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import { signUp } from '../../api/authApi';
import { EMAIL_REGEX } from '../../constants/constants';

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = userStore();

  const [message, setMessage] = useState('');
  const [signUpData, setSignData] = useState({
    email: '',
    password: '',
    displayName: '',
    profileImgBase64: '',
  });

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
    setSignData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // form이벤트의 기본 새로고침을 막음
    event.preventDefault();

    //// 클라이언트 사이드 유효성 검사

    // 이메일 or 비밀번호 or 이름을 입력하지 않은경우
    if (
      signUpData.email.trim() === '' ||
      signUpData.password.trim() === '' ||
      signUpData.displayName.trim() === ''
    ) {
      setMessage('이메일, 비밀번호, 이름을 모두 입력해주세요');
      return;
    }

    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(signUpData.email)) {
      setMessage('올바른 이메일을 입력해주세요');
      return;
    }

    // 비번 8자리 유효성검사
    if (signUpData.password.length < 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요');
      return;
    }

    // 이름 길이 유효성검사
    if (signUpData.displayName.length > 20) {
      setMessage('이름은 20자 이하로 작성해주세요');
      return;
    }

    const res = await signUp(signUpData);
    // 기타오류, 이미 등록된 이메일 or 유효성 오류 or apikey오류
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }
    // 회원가입에 성공하는 경우
    localStorage.setItem('token', res.accessToken);
    setUser({ ...res, isAdmin: false });
    navigate(-1);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={signUpData.email}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호(8자 이상)</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={signUpData.password}
        />
      </div>
      <div>
        <label htmlFor="displayName">이름(20자 이하)</label>
        <input
          id="displayName"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={signUpData.displayName}
        />
      </div>
      <div>
        <label htmlFor="profileImgBase64">프로필사진</label>
        <input
          id="profileImgBase64"
          type="file"
          name="profileImgBase64"
          onChange={handleChange}
        />
      </div>
      <button>회원가입</button>
      <div>{message}</div>
    </form>
  );
}
