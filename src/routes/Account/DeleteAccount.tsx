import React from 'react';
import { deleteAccount } from '../../api/bankApi';

interface DeleteAccountProps {
  account: UserAccount;
  accessToken: string;
  onAccountDeleted: (account: UserAccount) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  account,
  accessToken,
  onAccountDeleted,
}) => {
  const handleDelete = async () => {
    try {
      const isSuccess = await deleteAccount({
        accountId: account.id,
        signature: false,
      }, accessToken);
      if (isSuccess) {
        onAccountDeleted(account);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete}>계좌 삭제</button>
  );
};

export default DeleteAccount;
