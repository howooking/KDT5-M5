import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetail } from '@/api/transactionApi';
import formatDate from '@/FormatDate';
import { userStore } from '@/store';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OrderDetail() {
  const { detailId } = useParams<{ detailId: string }>();
  const [detail, setDetail] = useState<OrderDetail | null>(null);
  const { userInfo } = userStore();


  useEffect(() => {
    const fetchDetail = async () => {
      if (detailId) {
          const response = await getTransactionDetail(
              userInfo?.accessToken as string,
              detailId
          );
          setDetail(response.data);
      }
    };
    fetchDetail();
  }, [detailId]);

  return detail ? (
    <section className="container mx-auto px-20 py-4 max-w-screen-md">
      <table className="table-zebra table table-fixed text-center w-full">
        <tbody>
          <tr>
            <td className="w-36">은행</td>
            <td >{detail.account.bankName}</td>
          </tr>
          <tr>
            <td>계좌 번호</td>
            <td>{detail.account.accountNumber}</td>
          </tr>
          <tr>
            <td>상품 이미지</td>
            <td>
                {detail.product.thumbnail ? (
                    <img
                        src={detail.product.thumbnail}
                        alt={detail.product.title}
                        className="w-[100px] h-[100px] mx-auto"
                    />
                ) : (
                    '이미지 없음'
                )}
            </td>
          </tr>
          <tr>
              <td>상품 이름</td>
              <td>{detail.product.title}</td>
          </tr>
          <tr>
            <td>상품 가격(원)</td>
            <td>{detail.product.price.toLocaleString('ko-KR')}</td>
          </tr>
          <tr>
            <td>상품 설명</td>
            <td>{detail.product.description}</td>
          </tr>
          <tr>
            <td>태그</td>
            <td>{detail.product.tags.join(', ')}</td>
          </tr>
          <tr>
            <td>할인율</td>
            <td>{detail.product.discountRate}%</td>
          </tr>
          <tr>
            <td>거래 시간</td>
            <td>{formatDate(detail.timePaid)}</td>
          </tr>
          <tr>
            <td>거래 취소 여부</td>
            <td>{detail.isCanceled ? '취소됨' : '취소되지 않음'}</td>
          </tr>
          <tr>
            <td>거래 완료 여부</td>
            <td>{detail.done ? '완료됨' : '완료되지 않음'}</td>
          </tr>
        </tbody>
      </table>
    </section>
  ) : (
        <LoadingSpinner color="accent" />
  );
}
