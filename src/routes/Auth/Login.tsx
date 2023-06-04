/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import styles from './Login.module.css';
import { signIn } from '../../api/authApi';
import { EMAIL_REGEX } from '../../constants/constants';

export default function Login() {
  const { authMe, setUser } = userStore();
  useEffect(() => {
    authMe();
  }, []);

  //로그인 후 직전의 페이지로 이동하기 위해
  const navigate = useNavigate();

  // 로그인 과정 사용자와 상호작용
  const [message, setMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // form이벤트의 기본 새로고침을 막음
    event.preventDefault();

    //// 클라이언트 사이드 유효성 검사

    // 이메일과 비밀번호를 입력하지 않은경우
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      setMessage('이메일 또는 비밀번호를 입력해주세요');
      return;
    }

    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(loginData.email)) {
      setMessage('올바른 이메일을 입력해주세요');
      return;
    }

    const res = await signIn(loginData);

    // 기타오류, 없는 이메일 or 비번 입력 오류 or 유효성 오류 or apikey오류
    if (typeof res === 'string') {
      setMessage(res);
      return;
    }

    // 로그인에 성공하는 경우
    localStorage.setItem('token', res.accessToken);
    setUser({ ...res, isAdmin: false });
    navigate(-1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className={styles.login}>
      <h3>Login</h3>
      <form onSubmit={handleLogin} className={styles.form}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <span>{message}</span>
        <div>
          <button>로그인</button>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
}
