import { useEffect, useMemo, useState } from 'react';
import { getAllTransactions } from '@/api/adminApi';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';
import { convertToHumanReadable } from '@/lib/time';
import SectionTitle from '@/components/ui/SectionTitle';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAllTransactions();
      if (res.statusCode === 200) {
        setTransactions(res.data as TransactionDetail[]);
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'getTransactions' });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          transaction.user.displayName.includes(searchTerm) ||
          transaction.product.title.includes(searchTerm)
      ),
    [searchTerm, transactions]
  );

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="거래 내역" />
          <div className="mb-4">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="유저명 또는 상품 이름 검색"
              className="w-full border px-3 py-2"
            />
          </div>

          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>상품 이미지</th>
                <th>고객</th>
                <th>상품 이름</th>
                <th>가격(원)</th>
                <th>거래 시간</th>
                <th>거래 취소</th>
                <th>거래 완료</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={transaction.product.thumbnail || '/defaultThumb.jpg'}
                      alt="thumbnail"
                    />
                  </td>
                  <td>{transaction.user.displayName}</td>
                  <td>{transaction.product.title}</td>
                  <td>{transaction.product.price.toLocaleString('ko-KR')}</td>
                  <td>{convertToHumanReadable(transaction.timePaid)}</td>
                  <td>{transaction.isCanceled ? '취소함' : '취소하지 않음'}</td>
                  <td>{transaction.done ? '🔘' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
