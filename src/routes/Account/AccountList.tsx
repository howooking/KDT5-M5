import { useState, useEffect } from 'react';
import { getAccountListAndBalance, deleteAccount } from '@/api/bankApi';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { userStore } from '@/store';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';

export default function AccountList() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState<string | null>(null);
  const navigate = useNavigate();

  const { userInfo } = userStore();

  useEffect(() => {
    async function fetchAccountList() {
      setIsLoading(true);
      const res = await getAccountListAndBalance(
        userInfo?.accessToken as string
      );
      if (res.statusCode === 200) {
        setIsLoading(false);
        setTotalBalance((res.data as AccountsAndBalance).totalBalance);
        setAccounts((res.data as AccountsAndBalance).accounts);
        return;
      }
      toast.error(res.message, { id: 'getAccounts' });
      setIsLoading(false);
    }
    fetchAccountList();
  }, [userInfo?.accessToken]);

  const handleDeleteAccount = async (accountId: string) => {
    setDeletingAccount(accountId);
    const accountDeleted = await deleteAccount(
      { accountId, signature: true },
      userInfo?.accessToken as string
    );
    if (accountDeleted) {
      setAccounts(accounts.filter((account) => account.id !== accountId));
    }
    setDeletingAccount(null);
  };

  return (
    <section className="container mx-auto px-20 py-4">
      {isLoading ? (
        <CrazyLoading />
      ) : accounts.length > 0 ? (
        <>
          <SectionTitle text={`총 잔액: ${totalBalance}`} />
          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>은행명</th>
                <th>계좌번호</th>
                <th>잔액(원)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="text-center ">
                  <td>{account.bankName}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.balance.toLocaleString('ko-KR')}</td>
                  <td>
                    <Button
                      text={
                        deletingAccount ? (
                          <LoadingSpinner color="white" />
                        ) : (
                          '해지'
                        )
                      }
                      onClick={() => handleDeleteAccount(account.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p>연결된 계좌가 없습니다. 계좌를 추가해주세요!</p>
          <Button
            onClick={() => navigate('/myaccount/connectAccount')}
            text="계좌 연결하기"
          />
        </div>
      )}
    </section>
  );
}
