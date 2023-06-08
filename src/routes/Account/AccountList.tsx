import React, { useEffect, useState } from 'react';
import { getAccountList } from '../../api/bankApi';

const AccountList: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const data = await getAccountList();
        setTotalBalance(data.totalBalance);
        setAccounts(data.accounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccountList();
  }, []);

  return (
    <div>
      <h2>총 잔액: {totalBalance}</h2>
      <table>
        <thead>
          <tr>
            <th>은행명</th>
            <th>계좌번호</th>
            <th>잔액</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.bankName}</td>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
