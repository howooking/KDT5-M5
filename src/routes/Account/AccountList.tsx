/* eslint-disable react-hooks/exhaustive-deps */
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
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>();
  console.log(accounts);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { userInfo } = userStore();

  useEffect(() => {
    async function fetchAccountList() {
      setIsLoading(true);
      const res = await getAccountListAndBalance(
        userInfo?.accessToken as string
      );
      if (res.statusCode === 200) {
        if (res.data?.accounts.length === 0) {
          setIsLoading(false);
          toast.error('먼저 계좌를 등록해주세요', { id: 'getAccounts' });
          navigate('/myaccount/connectAccount');
          return;
        }
        setTotalBalance((res.data as AccountsAndBalance).totalBalance);
        setAccounts((res.data as AccountsAndBalance).accounts);
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'getAccounts' });
      setIsLoading(false);
    }
    fetchAccountList();
  }, [userInfo?.accessToken, isDeleting]);

  const handleDeleteAccount = async (
    accountId: string,
    accountName: string
  ) => {
    setAccounts((prevAccounts) =>
      prevAccounts?.map((account) =>
        account.id === accountId ? { ...account, delete: true } : account
      )
    );
    setIsDeleting(true);
    const res = await deleteAccount(
      { accountId, signature: true },
      userInfo?.accessToken as string
    );
    if (res.statusCode === 200) {
      toast.success(`${accountName}계좌를 해지하였습니다.`, {
        id: 'deleteAccount',
      });
      setIsDeleting(false);
      setAccounts(accounts?.filter((account) => account.id !== accountId));
      return;
    }
    toast.error(res.message, { id: 'deleteAccount' });
    setIsDeleting(false);
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <>
          <section className="container mx-auto px-20 py-4">
            <SectionTitle
              text={`총 잔액: ${totalBalance.toLocaleString('kr-KO')}원`}
            />
            <table className="table-zebra table table-fixed text-center">
              <thead className="text-sm text-black">
                <tr>
                  <th>은행명</th>
                  <th>계좌번호</th>
                  <th>잔액(원)</th>
                  <th>해지</th>
                </tr>
              </thead>
              <tbody>
                {accounts?.map((account) => (
                  <tr key={account.id} className="text-center ">
                    <td>{account.bankName}</td>
                    <td>{account.accountNumber}</td>
                    <td>{account.balance.toLocaleString('ko-KR')}</td>
                    <td>
                      <Button
                        text={
                          isDeleting && account.delete ? (
                            <LoadingSpinner color="white" />
                          ) : (
                            '해지'
                          )
                        }
                        onClick={() =>
                          handleDeleteAccount(account.id, account.bankName)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
}
