import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../api/api';
import { userStore } from '../store';
import styles from './Login.module.css';

export default function Login() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    authMe();
  }, []);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const authMe = userStore((state) => state.authMe);
  const setUser = userStore((state) => state.setUser);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 이메일과 비밀번호를 입력하지 않은경우
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      setMessage('이메일 or 비번 입력안함');
      return;
    }
    // 이메일의 유효성 검사
    const regex =
      /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regex.test(loginData.email)) {
      setMessage('올바른 이메일을 입력해주세요');
      return;
    }

    const userData = await signIn(loginData);
    if (userData.accessToken) {
      localStorage.setItem('token', userData.accessToken);
    } else {
      setMessage(userData);
      return;
    }
    setUser(userData);
    navigate('/', { replace: true });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
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
