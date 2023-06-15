import { useState, useEffect } from 'react';
import { getAccountList, deleteAccount } from '@/api/bankApi';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { userStore } from '@/store';

export default function AccountList() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingAccount, setDeletingAccount] = useState<string | null>(null);
  const navigate = useNavigate();

  const { userInfo } = userStore();

  useEffect(() => {
    async function fetchAccountList() {
      const data = await getAccountList(userInfo?.accessToken as string);
      if (data) {
        setLoading(false);
        setTotalBalance(data.totalBalance);
        setAccounts(data.accounts);
      }
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
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner color={'accent'} />
        </div>
      ) : accounts.length > 0 ? (
        <>
          <h2 className="mb-6 text-2xl">총 잔액: {totalBalance}</h2>
          <div className="mb-6 overflow-x-auto rounded bg-white shadow-md">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-3">은행명</th>
                  <th className="p-3">계좌번호</th>
                  <th className="p-3">잔액</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="text-center ">
                    <td className="p-3">{account.bankName}</td>
                    <td className="p-3">{account.accountNumber}</td>
                    <td className="p-3">{account.balance}</td>
                    <td className="p-3">
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
          </div>
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
    </div>
  );
}
