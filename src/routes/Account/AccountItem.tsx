import React from 'react';

interface AccountItemProps {
  account: Account;
  onDeleteAccount: (accountId: string) => void;
}

const AccountItem: React.FC<AccountItemProps> = ({ account, onDeleteAccount }) => {
  const handleDeleteAccount = () => {
    onDeleteAccount(account.id);
  };

  return (
    <div>
      <h4>{account.bankName}</h4>
      <p>{account.accountNumber}</p>
      <span>{account.balance}</span>
      <button onClick={handleDeleteAccount}>삭제</button>
    </div>
  );
};

export default AccountItem;
