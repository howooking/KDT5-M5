import { getOrderList } from '@/api/transactionApi';
import Button from '@/components/ui/Button';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  convertToHumanReadable,
  convertToMilliseconds,
} from '@/constants/library';
import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  // const [order, setoder] = useState()
  const { userInfo } = userStore();
  const [orders, setOrders] = useState<TransactionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrderList() {
      setIsLoading(true);
      const res = await getOrderList(userInfo?.accessToken as string);
      if (res.statusCode === 200) {
        setOrders(
          (res.data as TransactionDetail[]).filter((order) => !order.isCanceled)
        );
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'fetchOrderList' });
      setIsLoading(false);
    }
    fetchOrderList();
  }, [userInfo?.accessToken]);

  // 시간순으로 배열하기
  // .sort()
  const timeSortedOrders = orders.sort(
    (a, b) =>
      convertToMilliseconds(b.timePaid) - convertToMilliseconds(a.timePaid)
  );

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="주문 목록" />
          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>사진</th>
                <th>상품명</th>
                <th>상품가격(원)</th>
                <th>거래시간</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timeSortedOrders?.map((order) => (
                <tr>
                  <td>
                    <img
                      src={order.product.thumbnail || ''}
                      alt={order.product.title}
                    />
                  </td>
                  <td>{order.product.title}</td>
                  <td>{order.product.price.toLocaleString('ko-KR')}</td>
                  <td>{convertToHumanReadable(order.timePaid)}</td>
                  <td>
                    <Button
                      text="상세 내역"
                      onClick={() =>
                        navigate(`/myaccount/order/${order.detailId}`)
                      }
                      secondary
                    />
                    <Button
                      text="구매 확정"
                      //   onClick={handleSearch}
                      secondary
                    />
                    <Button
                      text="구매 취소"
                      //   onClick={handleSearch}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
