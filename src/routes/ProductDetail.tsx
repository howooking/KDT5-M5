import { getProductDetail } from '@/api/adminApi';
import SectionTitle from '@/components/ui/SectionTitle';
import { DICTIONARY_SHOES } from '@/constants/constants';
import { priceBeforeDiscount } from '@/constants/library';
import { useEffect, useState } from 'react';
import { getAccountList } from '@/api/bankApi';
import { userStore } from '@/store';
import { buyProduct } from '@/api/transactionApi';
import { Link, useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetail>();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const { userInfo } = userStore();
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      const res = await getProductDetail(productId as string);
      if (res) {
        setProduct(res);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    async function fetchAccountList() {
      const data = await getAccountList(userInfo?.accessToken as string);
      if (data) {
        setAccounts(data.accounts);
      }
    }
    fetchAccountList();
  }, [userInfo?.accessToken]);

  const handlePurchase = async () => {
    const purchaseResult = await buyProduct(
      productId as string,
      selectedAccount,
      userInfo?.accessToken as string
    );
    if (purchaseResult.data) {
      console.log('Purchase success');
    } else {
      console.log('Purchase failed');
    }
  };

  return (
    <div className="container mx-auto px-20">
      {isLoading ? (
        <LoadingSpinner color="accent" />
      ) : (
        <>
          <div className="py-4 text-sm text-gray-500">
            <Link to="/">크레이지11 /</Link>
            <Link to={`/products/${product?.tags[0]}`}>
              {' '}
              {DICTIONARY_SHOES[product?.tags[0] as string]} /
            </Link>
            <Link to=""> {product?.tags[1].toUpperCase()} / </Link>
            <span>{product?.title}</span>
          </div>
          <div className="flex gap-10">
            <div className="flex-1">
              {/* 이미지 */}
              <img
                src={product?.thumbnail || '/defaultThumb.jpg'}
                alt="썸네일 이미지"
                className="pl-[140px]"
              />
            </div>
            <div className="flex-1">
              <div className="py-10 text-2xl font-bold">{product?.title}</div>
              <div className="flex items-center gap-8">
                <span className="text-3xl text-red-500 ">
                  {product?.price.toLocaleString('ko-KR')}원
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {priceBeforeDiscount(
                    product?.price as number,
                    product?.discountRate as number
                  )}
                  원
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-400">
                  {product?.discountRate}%
                </span>
              </div>
              <div>
                <label htmlFor="account-select">결제할 계좌:</label>
                <select
                  name="account-select"
                  id="account-select"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  <option value="">계좌 선택</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bankName} - {account.accountNumber} - 잔액:{' '}
                      {account.balance}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handlePurchase} text="결제하기" />
            </div>
          </div>
          <div className="divider" />
          <SectionTitle text="상세 이미지" />
          <img
            src={product?.photo || '/defaultThumb.jpg'}
            alt="상세 이미지"
            className="mx-auto"
          />
        </>
      )}
    </div>
  );
}
