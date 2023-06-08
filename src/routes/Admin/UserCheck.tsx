import { useEffect, useState } from 'react';
import { getUsers } from '../../api/adminApi';
import SingleUser from '../../components/SingleUser';
import styles from './UserCheck.module.css';

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
      <div>
        <h3>유저 조회</h3>
        <table>
          <thead>
            <tr className={styles.title}>
              <th>번호</th>
              <th>Email</th>
              <th>이름</th>
            </tr>
          </thead>
          <tbody className={styles.user}>
            {users.map((data, index) => (
              <SingleUser key={data.email} data={data} index={index + 0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserCheck;
