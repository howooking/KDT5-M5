import { useEffect, useState } from 'react';
import { getUsers } from '@/api/adminApi';
import SingleUser from '@/components/SingleUser';
import { ADMINS } from '@/constants/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminClients() {
  const [users, setUsers] = useState<CheckUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getUsers();
      if (data) {
        setUsers(data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const adminCount = users.filter((user) => ADMINS.includes(user.email)).length;

  return (
    <div className="mx-auto my-3 w-1/2 bg-white text-gray-600 shadow-md">
      <h2 className="py-2">회원수: {users.length - adminCount}명</h2>
      {isLoading ? (
        <LoadingSpinner color="accent" />
      ) : (
        <table className="w-full min-w-max table-auto">
          <thead>
            <tr className="bg-gray-300 text-center uppercase text-gray-600">
              <th className="py-3">프로필사진</th>
              <th className="py-3">이메일</th>
              <th className="py-3">닉네임</th>
              <th className="py-3">역할</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {users.map((user, index) => {
              const isAdmin = ADMINS.includes(user.email);
              return (
                <SingleUser
                  index={index}
                  key={user.email}
                  displayName={user.displayName}
                  email={user.email}
                  profileImg={user.profileImg}
                  isAdmin={isAdmin}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
