import { useEffect, useState } from 'react';
import { getUsers } from '../../api/adminApi';
import SingleUser from '../../components/SingleUser';

import React from 'react';

interface CheckUser {
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

export default function UserCheck() {
  const [users, setUsers] = useState<CheckUser[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      if (!data) {
        return;
      }
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr >
              <th>번호</th>
              <th>Email</th>
              <th>이름</th>
              <th>프로필 사진</th>
            </tr>
          </thead>
          <tbody >
            {users.map((data, index) => (
              <SingleUser key={data.email} data={data} index={index + 0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


