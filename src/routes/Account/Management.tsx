import React, { useState, useEffect } from 'react';
import { fetchBanks, fetchAccounts, addAccount,deleteAccount } from '../../api/bankApi';
import AccountList from './AccountList';
import AddAccount from './AddAccount';

const AccountManagement: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accounts, setAccounts] = useState<AccountList>({ totalBalance: 0, accounts: [] });

  // API 호출을 통해 데이터를 가져와 상태를 업데이트합니다.
  const fetchData = async () => {
    try {
      const fetchedBanks = await fetchBanks();
      setBanks(fetchedBanks)    
      const fetchedAccounts = await fetchAccounts();
      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다.', error);
    }
  };

  // 계좌 추가 및 삭제 처리 후, 데이터를 새로고침합니다.
  const handleAddAccount = async (bankCode: string, accountNumber: string, phoneNumber: string) => {
    await addAccount({ bankCode, accountNumber, phoneNumber, signature: true });
    fetchData();
  };

  const handleDeleteAccount = async (accountId: string) => {
    await deleteAccount(accountId);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>계좌 관리</h1>
      <AccountList accounts={accounts.accounts} onDeleteAccount={handleDeleteAccount} />
      <AddAccount banks={banks} onAddAccount={handleAddAccount} />
    </div>
  );
};

export default AccountManagement;
