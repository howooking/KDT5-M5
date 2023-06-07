import { useEffect, useState } from 'react';
import { getUsers } from '../../api/adminApi';
import SingleUser from '../../components/SingleUser';

function UserCheck() {
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
      <h3>유저 조회</h3>
      {users.map((data) => (
        <SingleUser key={data.email} data={data} />
      ))}
    </div>
  );
}

export default UserCheck;
