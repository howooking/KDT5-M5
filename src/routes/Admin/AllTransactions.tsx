import { useEffect, useState } from 'react';
import { getAllTransactions } from '@/api/adminApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import formatDate from '../../FormatDate'

interface Transaction {
  user: {
    displayName: string;
  };
  product: {
    title: string;
    price: number;
    thumbnail?: string;
  };
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

export default function TransactionsPage () {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllTransactions();
      setTransactions(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    return (
      transaction.user.displayName.includes(searchTerm) ||
      transaction.product.title.includes(searchTerm)
    );
  });

  return (
    <section className="container mx-auto px-20 py-4">
      {/* 검색 입력란 추가 */}
      <div className="mb-4">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="유저명 또는 상품 이름 검색"
          className="border px-3 py-2 w-full"
        />
      </div>
      {/* 상품 목록 */}
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner color="accent" />
        </div>
      ) : (
        <table className="table-zebra table table-fixed text-center">
          <thead className="text-sm text-black">
            <tr>
              <th>유저명</th>
              <th>상품 이름</th>
              <th>가격</th>
              <th>썸네일 이미지</th>
              <th>거래 시간</th>
              <th>거래 취소 여부</th>
              <th>거래 완료 여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.user.displayName}</td>
                <td>{transaction.product.title}</td>
                <td>{transaction.product.price}</td>
                <td>
                  {transaction.product.thumbnail ? (
                    <img
                      src={transaction.product.thumbnail}
                      className={'w-[100px]'}
                      alt="thumbnail"
                    />
                  ) : (
                    '이미지 없음'
                  )}
                </td>
                <td>{formatDate(transaction.timePaid)}</td>
                <td>{transaction.isCanceled ? '취소됨' : '취소되지 않음'}</td>
                <td>{transaction.done ? '완료됨' : '완료되지 않음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};