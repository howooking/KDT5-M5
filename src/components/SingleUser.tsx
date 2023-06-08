import React from 'react';

interface CheckUser {
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

interface SingleUserProps {
  data: CheckUser;
  index: number;
}

export default function SingleUser({ data, index }: SingleUserProps) {
  // const even = index % 2 === 0 ? styles.even : '';

  return (
    <tr>
      <td >{index}</td>
      <td >{data.email}</td>
      <td> {data.displayName}</td>
      <td>
        <img src={data.profileImg || '/defaultProfile.jpg'} alt="Profile" />
      </td>
    </tr>
  );
}
