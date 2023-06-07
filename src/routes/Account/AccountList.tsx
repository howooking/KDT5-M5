import React from 'react';
import AccountItem from './AccountItem';

interface AccountListProps {
  accounts: Account[];
  onDeleteAccount: (accountId: string) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onDeleteAccount }) => {
  return (
    <div>
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account}
          onDeleteAccount={onDeleteAccount}
        />
      ))}
    </div>
  );
};

export default AccountList;
