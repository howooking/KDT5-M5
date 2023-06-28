import { confirmOrder, getOrderList, cancelOrder } from '@/api/transactionApi';
import Button from '@/components/ui/Button';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';
import { convertToHumanReadable, convertToMilliseconds } from '@/lib/time';
import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  const { userInfo } = userStore();
  const [orders, setOrders] = useState<TransactionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getOrderList(userInfo?.accessToken as string);
      if (res.statusCode === 200) {
        setOrders(
          (res.data as TransactionDetail[])
            .filter((order) => !order.isCanceled)
            .sort(
              (a, b) =>
                convertToMilliseconds(b.timePaid) -
                convertToMilliseconds(a.timePaid)
            )
        );
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'fetchOrderList' });
      setIsLoading(false);
    }
    fetchData();
  }, [userInfo?.accessToken, isOrdered]);

  const handleConfirmOrder = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    orderId: string,
    productTitle: string
  ) => {
    event.stopPropagation();
    setIsOrdered(false);
    if (confirm(`${productTitle} 구매를 확정하시겠습니까?`)) {
      toast.loading('구매확정 요청 중...', { id: 'confirmOrder' });
      const res = await confirmOrder(userInfo?.accessToken as string, orderId);
      if (res.statusCode === 200) {
        toast.success(`${productTitle} 구매를 확정하였습니다.`, {
          id: 'confirmOrder',
        });
        setIsOrdered(true);
        return;
      }
      toast.error(res.message, { id: 'confirmOrder' });
    }
  };

  const toOrderDetail = (orderId: string) => {
    navigate(`/myaccount/order/${orderId}`);
  };

  const handleCancel = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    detailId: string,
    productTitle: string
  ) => {
    event.stopPropagation();
    if (confirm(`${productTitle} 구매를 취소하시겠습니까?`)) {
      toast.loading('구매 취소 요청 중', { id: 'cancelOrder' });
      const res = await cancelOrder(detailId, userInfo?.accessToken as string);

      if (res.statusCode === 200) {
        const updatedOrders = orders.filter(
          (order) => order.detailId !== detailId
        );
        setOrders(updatedOrders);
        toast.success(`${productTitle} 구매를 취소하였습니다.`, {
          id: 'cancelOrder',
        });
        return;
      }
      toast.error(res.message, { id: 'cancelOrder' });
    }
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="구매 내역" />
          <table className="table-zebra table table-fixed text-center">
            <thead className="text-sm text-black">
              <tr>
                <th>상품이미지</th>
                <th>상품명</th>
                <th>상품가격(원)</th>
                <th>주문시간</th>
                <th>구매확정</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order.detailId}
                  onClick={() => toOrderDetail(order.detailId)}
                  className="cursor-pointer hover:opacity-80"
                >
                  <td>
                    <img
                      src={order.product.thumbnail as string}
                      alt={order.product.title}
                      className="mx-auto w-24"
                    />
                  </td>
                  <td>{order.product.title}</td>
                  <td>{order.product.price.toLocaleString('ko-KR')}</td>
                  <td>{convertToHumanReadable(order.timePaid)}</td>
                  <td>{order.done ? '🔘' : '❌'}</td>
                  <td className="space-y-2">
                    <Button
                      text={order.done ? '구매 확정 완료' : '구매 확정'}
                      disabled={order.done}
                      onClick={(event) =>
                        handleConfirmOrder(
                          event,
                          order.detailId,
                          order.product.title
                        )
                      }
                      secondary
                    />
                    {order.done ? (
                      <></>
                    ) : (
                      <Button
                        text="구매 취소"
                        onClick={(event) =>
                          handleCancel(
                            event,
                            order.detailId,
                            order.product.title
                          )
                        }
                      />
                    )}
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
