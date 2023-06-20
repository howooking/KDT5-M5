/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetail } from '@/api/transactionApi';
import { userStore } from '@/store';
import { convertToHumanReadable } from '@/constants/library';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';
import toast from 'react-hot-toast';
import { DICTIONARY_SHOES } from '@/constants/constants';
import Button from '@/components/ui/Button';

export default function OrderDetail() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { detailId } = useParams();
  const [detail, setDetail] = useState<TransactionDetail>();
  const { userInfo } = userStore();

  console.log(detail);
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
        return;
      }
      toast.error(res.message, { id: 'getOrderDetail' });
      navigate('/');
      setIsLoading(false);
    };
    fetchData();
  }, [detailId, userInfo?.accessToken]);

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <section className="container mx-auto px-20 py-4">
          <div className="flex items-center justify-between py-3">
            <SectionTitle text="상세 구매 내역" />
            <div className="">
              <Button
                text="상품 페이지로 이동"
                onClick={() =>
                  navigate(
                    `/products/${detail?.product.tags[0]}/${detail?.product.productId}`
                  )
                }
              />
            </div>
          </div>
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
                  <img
                    src={detail?.product.thumbnail as string}
                    alt={detail?.product.title}
                    className="mx-auto h-[100px] w-[100px]"
                  />
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
                <td>카테고리</td>
                <td>{DICTIONARY_SHOES[detail?.product.tags[0] as string]}</td>
              </tr>
              <tr>
                <td>브랜드</td>
                <td>{detail?.product.tags[1].toUpperCase()}</td>
              </tr>
              <tr>
                <td>할인율</td>
                <td>{detail?.product.discountRate}%</td>
              </tr>
              <tr>
                <td>구매 시간</td>
                <td>{convertToHumanReadable(detail?.timePaid || '')}</td>
              </tr>
              <tr>
                <td>구매 완료 여부</td>
                <td>{detail?.done ? '완료됨' : '완료되지 않음'}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
