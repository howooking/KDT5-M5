import { useEffect, useMemo, useState } from 'react';
import { getClients } from '@/api/adminApi';
import SingleUser from '@/components/SingleUser';
import { ADMINS } from '@/constants/constants';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import CrazyLoading from '@/components/ui/CrazyLoading';

export default function AdminClients() {
  const [clients, setClient] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getClients();
      // 조회 성공
      if (res.statusCode === 200) {
        setClient(res.data as Client[]);
        setIsLoading(false);
        return;
      }
      // 조회 실패
      toast.error(res.message, { id: 'getClients' });
      setIsLoading(true);
    }
    fetchData();
  }, []);

  const adminCount = useMemo(
    () => clients.filter((user) => ADMINS.includes(user.email)).length,
    [clients]
  );

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text={`회원수: ${clients.length - adminCount}명`} />

          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>프로필사진</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>역할</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((user, index) => {
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
        </section>
      )}
    </>
  );
}
