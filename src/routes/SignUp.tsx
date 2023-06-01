import { useState } from 'react';
import { signUp } from '../api/api';

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

export default function SignUp() {
  const [signUpData, setSignData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = await signUp(signUpData);
    localStorage.setItem('token', json.accessToken);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        name="email"
        onChange={handleChange}
        value={signUpData.email}
      />
      <label htmlFor="password">비밀번호(8자 이상)</label>
      <input
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        value={signUpData.password}
      />
      <label htmlFor="displayName">이름(20자 이하)</label>
      <input
        id="displayName"
        type="text"
        name="displayName"
        onChange={handleChange}
        value={signUpData.displayName}
      />
      <div className="flex-space"></div>
      {/* <span>프로필 사진</span>
      <input type="file" /> */}
      <button>회원가입</button>
    </form>
  );
}
