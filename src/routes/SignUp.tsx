import { useState } from 'react';
import { headers } from './Login';
import './SignUp.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
      {
        headers,
        method: 'post',
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    );
    const json = await res.json();
    localStorage.setItem('token', json.accessToken);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlename = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span>아이디</span>
      <input
        type="email"
        onChange={handleEmail}
        value={email}
        placeholder="Email을 입력하세요."
      />
      <span>비밀번호(8자 이상)</span>
      <input
        type="password"
        onChange={handlepassword}
        value={password}
        placeholder="PassWord를 입력하세요."
      />
      <span>이름(20자 이하)</span>
      <input
        type="text"
        onChange={handlename}
        value={name}
        placeholder="이름을 입력하세요."
      />
      <span>프로필 사진</span>
      <input type="file"  />
      <button>회원가입</button>
    </form>
  );
}
