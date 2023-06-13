import { useEffect, useState } from 'react';
import { getBankList } from '../../api/bankApi';

const SelectBank= () => {
  const [banks, setBanks] = useState<Bank[]>([]);

  const getAccessToken = () => localStorage.getItem('token');
  const accessToken = getAccessToken() || '';

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bankList = await getBankList(accessToken);
        setBanks(bankList);
      } catch (error) {
        console.error("Failed to fetch bank list:", error);
      }
    };
    fetchBanks();
  }, [accessToken]);

  return (
    <div>
      <h2>선택 가능한 은행 목록 조회</h2>
      <table>
        <thead>
          <tr>
            <th>은행 이름</th>
            <th>은행 코드</th>
            <th>계좌 자릿수</th>
            <th>계좌 추가 여부</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr key={bank.code}>
              <td>{bank.name}</td>
              <td>{bank.code}</td>
              <td>{bank.digits.join('-')}</td>
              <td>{bank.disabled ? '추가됨' : '추가 가능'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectBank;
