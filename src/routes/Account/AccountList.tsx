// React 임포팅 불필요
import React, { useState, useEffect } from 'react';
import { getAccountsAndBalance } from '../../api/bankApi';
// 코드가 너무 어렵습니다.
import DeleteAccount from './DeleteAccount';
import Button from '@/components/ui/Button';
import { userStore } from '@/store';

const AccountList = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(
    new Set()
  );

  // userInfo에서 token사용
  const { userInfo } = userStore();
  // const getAccessToken = () => localStorage.getItem('token');
  // const accessToken = getAccessToken() || '';

  useEffect(() => {
    async function fetchAccountList() {
      // 해당페이지에서는 token이 없을 수 없습니다.
      const data = await getAccountsAndBalance(userInfo?.accessToken as string);
      // data가 undefined일 수 있으므로 분기가 필요합니다.
      setTotalBalance(data.totalBalance);
      setAccounts(data.accounts);
    }
    fetchAccountList();
  }, [userInfo?.accessToken]);

  //
  const handleAccountDeleted = (deletedAccount: UserAccount) => {
    // 통신이 필요합니다.

    // 삭제에 성공한경우(return 값이 true인 경우)아래 코드
    setAccounts(accounts.filter((account) => account.id !== deletedAccount.id));
  };

  // 한번에 삭제 기능 없는게 좋아보입니다.
  // const handleCheckboxChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   accountId: string
  // ) => {
  //   const newSelectedAccounts = new Set(selectedAccounts);
  //   if (event.target.checked) {
  //     newSelectedAccounts.add(accountId);
  //   } else {
  //     newSelectedAccounts.delete(accountId);
  //   }
  //   setSelectedAccounts(newSelectedAccounts);
  // };

  return (
    <div className="container mx-auto px-20">
      <h2 className="py-3 text-3xl text-gray-800">잔액 : {totalBalance}</h2>
      <div className="divider my-0" />
      <table className="table table-fixed text-center">
        <thead className="text-sm text-black">
          <tr>
            <th>은행명</th>
            <th>계좌번호</th>
            <th>잔액</th>
            <th className="w-20"></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr
              key={account.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}
            >
              <td>{account.bankName}</td>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <Button
                text="해지"
                // onClick={() => {
                //   handleDeleteAccount(account.id, account.bankName);
                // }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
