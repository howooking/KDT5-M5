import React from 'react';
import { deleteAccount } from '../../api/bankApi';

interface DeleteAccountProps {
  accounts: UserAccount[];
  onAccountsDeleted: (account: UserAccount[]) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  accounts,
  onAccountsDeleted,
}) => {
  const getAccessToken = () => localStorage.getItem('token');
  const accessToken = getAccessToken() || '';

  const handleDelete = async () => {
    try {
      const deletedAccounts: UserAccount[] = [];

      for (const account of accounts) {
        const isSuccess = await deleteAccount({
          accountId: account.id,
          signature: true,
        }, accessToken);

        if (isSuccess) {
          deletedAccounts.push(account);
        }
      }

      onAccountsDeleted(deletedAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete}>계좌 삭제</button>
  );
};

export default DeleteAccount;
