import { getOrderList } from '@/api/transactionApi';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  convertToHumanReadable,
  convertToMilliseconds,
} from '@/constants/library';
import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  const { userInfo } = userStore();
  const [orders, setOrders] = useState<TransactionDetail[]>([]);
  const navigate = useNavigate();

  // 통신해서 주문 목록을 가져옴
  useEffect(() => {
    async function fetchOrderList() {
      const res = await getOrderList(userInfo?.accessToken as string);
      console.log(res);
      if (res.statusCode === 200) {
        // 성공
        const orderList = res.data;
        setOrders(
          (orderList as TransactionDetail[]).filter(
            (order) => !order.isCanceled
          )
        );
      }
      //실패가 발생 상호작용
    }
    fetchOrderList();
  }, [userInfo?.accessToken]);

  // 시간순으로 배열하기
  // .sort()
  const timeSortedOrders = orders.sort(
    (a, b) =>
      convertToMilliseconds(b.timePaid) - convertToMilliseconds(a.timePaid)
  );

  const handleDetailButton = (detailId: string) => {
    navigate(`/myaccount/orderDetail/${detailId}`);
  };

  return (
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
                    onClick={() => handleDetailButton(order.detailId)}
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

              {/* <td>
                  <Button
                    text="상세조회"
                    onClick={handleSearch}
                    value={product.id}
                    secondary
                  />
                  <Button
                    onClick={() => handleUpdate(product.id, product.title)}
                    text="상품수정"
                    value={product.id}
                    secondary
                  />
                  <Button
                    text="상품삭제"
                    onClick={() => handleDelete(product.id)}
                    value={product.id}
                  />
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
