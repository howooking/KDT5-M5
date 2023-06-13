import React, { useState, useEffect } from 'react';
import { connectAccount } from '../../api/bankApi';
import {Banks} from './Banks'

interface ConnectAccountProps {
  onAccountConnected: (account: UserAccount) => void;
}

const ConnectAccount: React.FC<ConnectAccountProps> = ({
  onAccountConnected,
}) => {
  const [bankCode, setBankCode] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [signature, setSignature] = useState(false);
  const [bankData, setBankData] = useState<Bank[]>([]);
  
  const getAccessToken = () => localStorage.getItem('token');
  const accessToken = getAccessToken() || '';

  useEffect(() => {
    const fetchBanks = () => {
      const fetchedBanks = Banks();
      setBankData(fetchedBanks);
    };

    fetchBanks();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const account = await connectAccount({
        bankCode,
        accountNumber,
        phoneNumber,
        signature,
      }, accessToken);
      onAccountConnected(account);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="bankCode">
        은행 선택
        <select
          id="bankCode"
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
        >
          <option value="">은행을 선택해 주세요</option>
          {bankData.map((bank) => (
            <option key={bank.code} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="accountNumber">
        계좌번호 입력
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="phoneNumber">
        전화번호 입력
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
      동의
      <input type="checkbox" checked={signature} onChange={handleSignature} />
      </label>
      <br />
      <button type="submit">계좌 연결</button>
    </form>
  );  
};

export default ConnectAccount;
