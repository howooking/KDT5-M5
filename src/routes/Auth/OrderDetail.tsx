import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail } from '@/api/transactionApi';
import { userStore } from '@/store';
import { convertToHumanReadable } from '@/constants/library';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';

export default function OrderDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { detailId } = useParams();
  const [detail, setDetail] = useState<TransactionDetail>();
  const { userInfo } = userStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getOrderDetail(
        userInfo?.accessToken as string,
        detailId as string
      );
      if (res.statusCode === 200) {
        setDetail(res.data as TransactionDetail);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [detailId, userInfo?.accessToken]);

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <SectionTitle text="거래 상세 내역" />
          <table className="table-zebra mx-auto table w-full table-fixed text-center">
            <tbody>
              <tr>
                <td className="w-36">은행</td>
                <td>{detail?.account.bankName}</td>
              </tr>
              <tr>
                <td>계좌 번호</td>
                <td>{detail?.account.accountNumber}</td>
              </tr>
              <tr>
                <td>상품 이미지</td>
                <td>
                  {detail?.product.thumbnail ? (
                    <img
                      src={detail?.product.thumbnail}
                      alt={detail?.product.title}
                      className="mx-auto h-[100px] w-[100px]"
                    />
                  ) : (
                    '이미지 없음'
                  )}
                </td>
              </tr>
              <tr>
                <td>상품 이름</td>
                <td>{detail?.product.title}</td>
              </tr>
              <tr>
                <td>상품 가격(원)</td>
                <td>{detail?.product.price.toLocaleString('ko-KR')}</td>
              </tr>
              <tr>
                <td>상품 설명</td>
                <td>{detail?.product.description}</td>
              </tr>
              <tr>
                <td>태그</td>
                <td>{detail?.product.tags.join(', ')}</td>
              </tr>
              <tr>
                <td>할인율</td>
                <td>{detail?.product.discountRate}%</td>
              </tr>
              <tr>
                <td>거래 시간</td>
                <td>{convertToHumanReadable(detail?.timePaid || '')}</td>
              </tr>
              <tr>
                <td>거래 취소 여부</td>
                <td>{detail?.isCanceled ? '취소됨' : '취소되지 않음'}</td>
              </tr>
              <tr>
                <td>거래 완료 여부</td>
                <td>{detail?.done ? '완료됨' : '완료되지 않음'}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
