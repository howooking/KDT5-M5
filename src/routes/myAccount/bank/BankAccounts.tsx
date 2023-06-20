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

export default function BankAccounts() {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { userInfo } = userStore();

  useEffect(() => {
    setIsLoading(true);
    async function fetchAccountList() {
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
  }, [userInfo?.accessToken]);

  const handleDeleteAccount = async (
    accountId: string,
    accountName: string
  ) => {
    if (confirm(`${accountName} 계좌를 해지하시겠습니까?`)) {
      setIsDeleting(true);
      setAccounts((prevAccounts) =>
        prevAccounts?.map((account) =>
          account.id === accountId ? { ...account, delete: true } : account
        )
      );
      const res = await deleteAccount(
        { accountId, signature: true },
        userInfo?.accessToken as string
      );
      if (res.statusCode === 200) {
        toast.success(`${accountName} 계좌를 해지하였습니다.`, {
          id: 'deleteAccount',
        });
        setAccounts((prev) => prev?.filter((bank) => bank.id !== accountId));
        setIsDeleting(false);
        return;
      }
      toast.error(res.message, { id: 'deleteAccount' });
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="계좌 조회 / 해지" />
          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>은행명</th>
                <th>계좌번호</th>
                <th>잔액(원)</th>
                <th className="w-36">해지</th>
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
                      disabled={isDeleting}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="my-2 text-right text-xl font-bold">
            잔액 : {totalBalance.toLocaleString('kr-KO')}원
          </h3>
        </section>
      )}
    </>
  );
}
