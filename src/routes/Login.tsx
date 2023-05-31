import { useState } from 'react';
import { Link } from 'react-router-dom';
import userStore from '../store';

export const headers = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
};

interface LoginDataType {
  email: string;
  password: string;
}

const login = async (loginData: LoginDataType) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    }
  );
  const json = await res.json();
  return json;
};

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const setUser = userStore((state) => state.setUser);
  const userInfo = userStore((state) => state.userInfo);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = await login(loginData);
    setUser(userData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>로그인</h2>
      {userInfo.user.displayName}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button>로그인</button>
        <Link to="/signup">회원가입</Link>
      </form>
    </div>
  );
}