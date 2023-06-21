import { useEffect, useMemo, useState } from 'react';
import { getAllTransactions, getClients } from '@/api/adminApi';
import SingleUser from '@/components/SingleUser';
import { ADMINS } from '@/constants/constants';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import CrazyLoading from '@/components/ui/CrazyLoading';

export default function AdminClients() {
  const [clients, setClients] = useState<SpentMoneyIncludedClient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const promiseClients = getClients();
      const promiseTansactions = getAllTransactions();
      // 통신을 두개 돌리기 때문에 로딩시간이 긻니다.
      const [res1, res2] = await Promise.all([
        promiseClients,
        promiseTansactions,
      ]);
      if (res1.statusCode === 200 && res2.statusCode === 200) {
        const spentMoneyIncludedClients = (res1.data as Client[]).map(
          (client) => {
            // 각 고객마다 소비금액을 구하는 로직
            const spentMoney = (res2.data as TransactionDetail[])
              // 고객이메일과 거래정보 이메일이 일치하면서 완료된 거래 필터링
              .filter(
                (transaction) =>
                  transaction.user.email === client.email && transaction.done
              )
              // 거래 금액을 다 더함
              .reduce((acc, curr) => acc + curr.product.price, 0);

            return {
              ...client,
              spentMoney,
            };
          }
        );
        setClients(spentMoneyIncludedClients);
        setIsLoading(false);
        return;
      }
      toast.error(res1.message, { id: 'getClients' });
      setIsLoading(false);
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
          <div className="flex justify-between">
            <SectionTitle text="회원 정보" />
            <SectionTitle text={`회원수: ${clients.length - adminCount}명`} />
          </div>

          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>프로필사진</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>
                  등급(<span className="text-accent">💰VIP</span> : 30만원,
                  <span className="text-accent"> 💰VVIP💰</span> : 50만원)
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((user) => {
                return (
                  <SingleUser
                    key={user.email}
                    displayName={user.displayName}
                    email={user.email}
                    profileImg={user.profileImg}
                    spentMoney={user.spentMoney}
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
