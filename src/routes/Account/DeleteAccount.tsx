import React from 'react';
import { deleteAccount } from '../../api/bankApi';

interface DeleteAccountProps {
  account: UserAccount;
  onAccountDeleted: (account: UserAccount) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  account,
  onAccountDeleted,
}) => {
  const handleDelete = async () => {
    try {
      const isSuccess = await deleteAccount({
        accountId: account.id,
        signature: false,
      });
      if (isSuccess) {
        onAccountDeleted(account);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Account</button>
  );
};

export default DeleteAccount;
