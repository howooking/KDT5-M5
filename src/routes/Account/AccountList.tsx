import React, { useState, useEffect } from 'react';
import { getAccountList } from '../../api/bankApi';
import DeleteAccount from './DeleteAccount';

const AccountList = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());

  const getAccessToken = () => localStorage.getItem('token');
  const accessToken = getAccessToken() || '';

  useEffect(() => {
    async function fetchAccountList() {
      const data = await getAccountList(accessToken);
      setTotalBalance(data.totalBalance);
      setAccounts(data.accounts);
    }
  
    if (accessToken) {
      fetchAccountList();
    }
  }, [accessToken]);

  const handleAccountDeleted = (deletedAccount: UserAccount) => {
    setAccounts(accounts.filter(account => account.id !== deletedAccount.id));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, accountId: string) => {
    const newSelectedAccounts = new Set(selectedAccounts);
    if (event.target.checked) {
      newSelectedAccounts.add(accountId);
    } else {
      newSelectedAccounts.delete(accountId);
    }
    setSelectedAccounts(newSelectedAccounts);
  };

  return (
    <div>
      <h2>총 잔액: {totalBalance}</h2>
      <table>
        <thead>
          <tr>
            <th>체크</th>
            <th>은행명</th>
            <th>계좌번호</th>
            <th>잔액</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, account.id)}
                />
              </td>
              <td>{account.bankName}</td>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteAccount
      accounts={Array.from(selectedAccounts).reduce((result: UserAccount[], accountId) => {
        const account = accounts.find(account => account.id === accountId);
      if (account) {
        result.push(account);
      }
      return result;
      }, [])}
      onAccountsDeleted={(deletedAccounts) => {
        deletedAccounts.forEach(deletedAccount =>
          handleAccountDeleted(deletedAccount)
    );
  }}
/>
    </div>
  );
};

export default AccountList;
