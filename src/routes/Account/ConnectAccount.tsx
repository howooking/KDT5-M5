// 클라이언트사이드 유효성 검사를 생략하겠습니다.
import { useState, useEffect, useMemo } from 'react';
import { connectAccount, getBankList } from '../../api/bankApi';
import Select from '@/components/ui/Select';
import { userStore } from '@/store';
import Input from '@/components/ui/Input';
import { BANKS } from '@/constants/constants';
import Button from '@/components/ui/Button';
import AlertMessage from '@/components/ui/AlertMessage';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ConnectAccount() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { userInfo } = userStore();
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    async function fetchBanks() {
      const res = await getBankList(userInfo?.accessToken as string);
      if (res) {
        setBanks(res);
      }
    }
    fetchBanks();
  }, [userInfo?.accessToken]);

  // 가져온 은행들 중 사용 가능한 것만 option으로 사용
  const bankOptions = [
    { name: '은행선택', value: '' },
    ...banks
      .filter((bank) => !bank.disabled)
      .map((bank) => ({
        name: bank.name,
        value: bank.code,
      })),
  ];

  // 계좌등록에 필요한 data 스테이트
  const [bankInputData, setBankInputData] = useState<ConnectAccountBody>({
    accountNumber: '',
    bankCode: '',
    phoneNumber: '',
    signature: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    if (event.target.type === 'checkbox') {
      setBankInputData((prev) => ({
        ...prev,
        [name]: (event.target as HTMLInputElement).checked,
      }));
    } else {
      setBankInputData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 은행선택시 digits가져오는 로직
  const selectedBankDigits = useMemo(
    () => BANKS.find((bank) => bank.code === bankInputData.bankCode)?.digits,
    [bankInputData.bankCode]
  );

  // digits 수
  const totalDigits = selectedBankDigits?.reduce((acc, curr) => acc + curr);

  // 전송함수
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    const res = await connectAccount(
      bankInputData,
      userInfo?.accessToken as string
    );
    if (typeof res === 'string') {
      setMessage(res);
      setIsSending(false);
      return;
    }
    setIsSending(false);
    navigate('/myaccount/accountList');
  }

  return (
    <div className="container mx-auto w-96 py-20">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Select
          onChange={handleChange}
          options={bankOptions}
          value={bankInputData.bankCode}
          name="bankCode"
        />
        <Input
          name="accountNumber"
          onChange={handleChange}
          maxLength={totalDigits}
          placeholder={`${
            totalDigits ? totalDigits + '자리 계좌번호' : '계좌번호'
          }`}
        />
        <Input
          name="phoneNumber"
          onChange={handleChange}
          maxLength={11}
          placeholder="휴대폰번호 '-' 없이"
        />
        <div className="flex items-center gap-2">
          <input
            className="h-6 w-6 appearance-none rounded border-2 border-gray-300 checked:border-transparent checked:bg-accent"
            name="signature"
            id="signature"
            type="checkbox"
            checked={bankInputData.signature}
            onChange={handleChange}
          />
          <label htmlFor="signature" className="select-none">
            귀하는 간편결제 계좌 등록에 동의합니다.
          </label>
        </div>
        <AlertMessage message={message} />
        <Button
          text={isSending ? <LoadingSpinner color="white" /> : '계좌 연결'}
          disabled={isSending}
        />
      </form>
    </div>
  );
}
