import { useState, useEffect, useMemo } from 'react';
import { connectAccount, getBankList } from '@/api/bankApi';
import Select from '@/components/ui/Select';
import { userStore } from '@/store';
import Input from '@/components/ui/Input';
import { BANKS } from '@/constants/constants';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ConnectBankAccount() {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const { userInfo } = userStore();
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getBankList(userInfo?.accessToken as string);
      if (res.statusCode === 200) {
        setBanks(res.data as Bank[]);
        return;
      }
      toast.error(res.message, { id: 'getBankList' });
    }
    fetchData();
  }, [userInfo?.accessToken]);

  // 가져온 은행들 중 사용 가능한 것만 option으로 사용
  const bankOptions = useMemo(
    () => [
      { name: '은행선택*', value: '' },
      ...banks
        .filter((bank) => !bank.disabled)
        .map((bank) => ({
          name: bank.name,
          value: bank.code,
        })),
    ],
    [banks]
  );

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

  // 은행선택시 digits의 합을 구하는 로직
  const selectedBankDigits = useMemo(
    () =>
      BANKS.find((bank) => bank.code === bankInputData.bankCode)?.digits.reduce(
        (acc, curr) => acc + curr
      ),
    [bankInputData.bankCode]
  );

  // 전송함수
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      bankInputData.bankCode.trim() === '' ||
      bankInputData.accountNumber.trim() === '' ||
      bankInputData.phoneNumber.trim() === ''
    ) {
      toast.error('은행, 계좌번호, 휴대폰번호를 입력해주세요.');
      return;
    }
    if (!bankInputData.signature) {
      toast.error('간편결제 등록에 동의해주세요.');
      return;
    }

    setIsSending(true);
    toast.loading('계좌를 추가하고 있습니다.', { id: 'connectAccount' });
    const res = await connectAccount(
      bankInputData,
      userInfo?.accessToken as string
    );
    if (res.statusCode === 200) {
      toast.success(res.message, { id: 'connectAccount' });
      setIsSending(false);
      navigate('/myaccount/accountList');
      return;
    }
    toast.error(res.message, { id: 'connectAccount' });
    setIsSending(false);
  }

  return (
    <div className="container mx-auto px-20 py-4">
      <SectionTitle text="계좌 연결" />
      <div className="my-20 flex justify-center">
        <form className="flex w-96 flex-col gap-3" onSubmit={handleSubmit}>
          <Select
            onChange={handleChange}
            options={bankOptions}
            value={bankInputData.bankCode}
            name="bankCode"
          />
          <Input
            name="accountNumber"
            onChange={handleChange}
            maxLength={selectedBankDigits}
            placeholder={`${
              selectedBankDigits
                ? selectedBankDigits + "자리 계좌번호 '-' 없이*"
                : '계좌번호*'
            }`}
          />
          <Input
            name="phoneNumber"
            onChange={handleChange}
            maxLength={11}
            placeholder="휴대폰번호 '-' 없이*"
          />
          <div className="flex items-center gap-2">
            <input
              className="h-6 w-6 cursor-pointer appearance-none rounded border-2 border-gray-300 checked:border-transparent checked:bg-accent"
              name="signature"
              id="signature"
              type="checkbox"
              checked={bankInputData.signature}
              onChange={handleChange}
            />
            <label htmlFor="signature" className="cursor-pointer select-none">
              간편결제 계좌 등록에 동의합니다.
            </label>
          </div>
          <Button
            submit
            text={isSending ? <LoadingSpinner color="white" /> : '계좌 연결'}
            disabled={isSending}
          />
        </form>
      </div>
    </div>
  );
}
