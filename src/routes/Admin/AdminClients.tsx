import { useEffect, useState } from 'react';
import { getUsers } from '../../api/adminApi';
import SingleUser from '../../components/SingleUser';
// import styles from './UserCheck.module.css';

export default function AdminClients() {
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
      <table className={'mx-auto w-[50%] text-2xl'}>
        <thead>
          <tr>
            <th>번호</th>
            <th>Email</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <SingleUser key={data.email} data={data} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
