import React, { useState } from 'react';

interface AddAccountProps {
  banks: Bank[];
  onAddAccount: (bankCode: string, accountNumber: string, phoneNumber: string) => void;
}

const AddAccount: React.FC<AddAccountProps> = ({ banks, onAddAccount }) => {
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bankCode || !accountNumber || !phoneNumber) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    onAddAccount(bankCode, accountNumber, phoneNumber);

    setBankCode('');
    setAccountNumber('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      // 여기에 은행 목록 선택, 계좌 번호 입력, 전화번호 입력 폼을 작성하세요.
      <button type="submit">계좌 추가</button>
    </form>
  );
};

export default AddAccount;
