import { useEffect, useMemo, useState } from 'react';
import { getAllTransactions } from '@/api/adminApi';
import toast from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';
import { convertToHumanReadable } from '@/constants/library';

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
    <section className="container mx-auto px-20 py-4">
      <div className="mb-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="유저명 또는 상품 이름 검색"
          className="w-full border px-3 py-2"
        />
      </div>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <table className="table-zebra table table-fixed text-center">
          <thead className="text-sm text-black">
            <tr>
              <th>상품 이미지</th>
              <th>고객</th>
              <th>상품 이름</th>
              <th>가격</th>
              <th>거래 시간</th>
              <th>거래 취소 여부</th>
              <th>거래 완료 여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  {transaction.product.thumbnail ? (
                    <img src={transaction.product.thumbnail} alt="thumbnail" />
                  ) : (
                    '이미지 없음'
                  )}
                </td>
                <td>{transaction.user.displayName}</td>
                <td>{transaction.product.title}</td>
                <td>{transaction.product.price}</td>
                <td>{convertToHumanReadable(transaction.timePaid)}</td>
                <td>{transaction.isCanceled ? '취소됨' : '취소되지 않음'}</td>
                <td>{transaction.done ? '완료됨' : '완료되지 않음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
