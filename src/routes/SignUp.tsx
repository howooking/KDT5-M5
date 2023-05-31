import { useState } from 'react';
import { headers } from './Login';
import { Link } from 'react-router-dom';
import './SignUp.css';




// //로그인 인증.
// const authenticate async (event: React.FormEvent<HTMLFormElement>) {
//   event.preventDefault();
//   const res = await fetch(
//     'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
//     {
//       method: 'post',
//       headers,
//       body: JSON.stringify({
//         email,
//         displayName,
//         profileImg
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }),
//     }
//   );
// };

// //로그아웃.
// const logout async (event: React.FormEvent<HTMLFormElement>) {
//   event.preventDefault();
//   const res = await fetch(
//     'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
//     {
//       method: 'post',
//       headers,
//       body: JSON.stringify({
//         ResponseValue = true
//       }),
//     }
//     );
// };





export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
      {
        method: 'post',
        headers,
        body: JSON.stringify({
          email,
          password,
          displayName,
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
    setDisplayName(event.target.value);
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
        value={displayName}
        placeholder="이름을 입력하세요."
      />
      <div className="flex-space"></div>
      <span>프로필 사진</span>
      <input type="file" />
      <Link to="/login">
        <button>회원가입</button>
      </Link>
    </form>
  );
}
