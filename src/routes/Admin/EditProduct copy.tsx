import { useEffect, useState } from 'react';
import { getProductDetail, updateProduct } from '@/api/adminApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AlertMessage from '@/components/ui/AlertMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ImageUpload from '@/components/ui/ImageUpload';
import Select from '@/components/ui/Select';
import { SELECT_BRAND, SELECT_CATEGORY } from '@/constants/constants';
import { useLocation } from 'react-router-dom';

export default function EditProduct() {
  const {
    state: { productId },
  } = useLocation();
  // 수정값들의 다음과 같이 string으로 초기값을 세팅해줘야합니다.
  // const [editProductInputData, setEditProductInputData] =
  // useState<EditProductInputData>({
  //   isSold: false,
  //   title: '',
  //   price: '',
  //   description: '',
  //   tags: ['', ''],
  //   thumbnailBase64: '',
  //   photoBase64: '',
  //   discountRate: '',
  // });
  const [detailProduct, setDetailProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const [positive, setPositive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // 사소한 부분인데 통신이 진행되기 전에, 즉 fetchProducts()바로 위에 실행하는게 절차적으로 맞습니다.
      setLoading(true);
      const res = await getProductDetail(productId);
      if (res) {
        // 인풋 값 중에 price는 number인데 input type은 string이므로 변환이 필요합니다.
        // 나머지도 하나하나 입력해줘야합니다.
        setDetailProduct(res);
        setLoading(false);
      }
    };
    // 이쪽으로
    fetchProducts();
    // productId가 바뀌면 이 useEffect가 실행되어야 하므로 []안에 채워주세요
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // HTMLSelectElement의 경우 event.target.checked가 없어서 발생하는 오류입니다.
    // check를 지우고 사용하는 곳에서 event의 타입을 단언해주면 됩니다.
    const { name, value, type, checked } = event.target;

    if (type === 'file') {
      // 여기보시면 event.target.files는 HTMLSelectElement안에 없기 떄문에 as HTMLInputElement로 단언해준 것을 볼 수 있습니다.
      const files = (event.target as HTMLInputElement).files as FileList;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setDetailProduct((prevData) => {
          return {
            ...prevData,
            [name]: reader.result as string,
          };
        });
      };

      // select로 tags의 element를 지정하는 로직
      // tags = ["카테고리(축구화, 족구화...)", "브랜드(나이키, 아디다스...)"]
    } else if (name === 'category') {
      setDetailProduct((prevData) => {
        return {
          ...prevData,
          tags: [value, prevData?.tags?.[1] || ''],
        };
      });
    } else if (name === 'brand') {
      setDetailProduct((prevData) => {
        return {
          ...prevData,
          tags: [prevData?.tags?.[0] || '', value],
        };
      });
    } else if (checked) {
      setDetailProduct((prevdata) => {
        return {
          ...prevdata,
          [name]: checked,
        };
      });
    } else {
      setDetailProduct((prevdata) => {
        return {
          ...prevdata,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 상품을 추가 하고 나서 에러메세지의 색을 다시 빨간색으로 바꾸기 위해
    setPositive(false);

    // 이전 타임아웃이 아직 작동중이면 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    //// 클라이언트 사이드 유효성 검사

    // 제품이름 or 제품가격 or 제품설명을 입력하지 않은 경우
    if (
      detailProduct?.title.trim() === '' ||
      detailProduct?.price.toString().trim() === '' ||
      detailProduct?.description.toString().trim() === ''
    ) {
      setMessage('제품이름, 가격, 제품설명을 모두 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 할인율 0 ~ 99 가 아닌경우
    if (detailProduct?.discountRate) {
      if (
        !Number(detailProduct?.discountRate) ||
        Number(detailProduct?.discountRate) <= 0 ||
        Number(detailProduct?.discountRate) >= 100
      ) {
        setMessage('할인율은 0 ~ 99를 입력해주세요.');
        const id = setTimeout(() => {
          setMessage('');
        }, 2000);
        setTimeoutId(id);
        return;
      }
    }

    ////////////// api 통신 부분 시작

    setIsSending(true);
    const res = await updateProduct(detailProduct?.id as string, {
      ...detailProduct,
      discountRate: Number(detailProduct?.discountRate),
      price: Number(detailProduct?.price),
    });
    console.log(res);

    // 제품등록이 성공한 경우
    if (!res) {
      setPositive(true);
      setMessage('제품을 등록하였습니다.');
      setIsSending(false);
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    // 제품등록이 실패한 경우
    setMessage(res);
    setIsSending(false);
    const id = setTimeout(() => {
      setMessage('');
    }, 2000);
    setTimeoutId(id);
  };
  ////////////   통신 부분 끝

  return (
    <div className="flex justify-center p-3">
      <div className="flex flex-col">
        <h3 className="py-3 text-3xl text-gray-800">
          {loading ? <LoadingSpinner color={'accent'} /> : detailProduct?.title}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-10">
            <div className="flex-1  space-y-3">
              <Select
                options={SELECT_CATEGORY}
                onChange={handleChange}
                value={detailProduct?.tags[0] as string}
              />
              <Select
                options={SELECT_BRAND}
                onChange={handleChange}
                value={detailProduct?.tags[1] as string}
              />

              <Input
                placeholder="제품이름*"
                name="title"
                onChange={handleChange}
                value={detailProduct?.title}
              />
              <Input
                placeholder="가격*"
                name="price"
                onChange={handleChange}
                value={detailProduct?.price}
              />
              <Input
                placeholder="제품설명*"
                name="description"
                onChange={handleChange}
                value={detailProduct?.description}
              />
              <Input
                placeholder="할인율 (0 ~ 99, 입력 안할 경우 0) "
                name="discountRate"
                onChange={handleChange}
                value={detailProduct?.discountRate}
              />
            </div>
          </div>
          <div className={'flex'}>
            <label className="swap">
              <input
                type="checkbox"
                checked={detailProduct?.isSoldOut}
                onChange={handleChange}
              />
              <div className="swap-on text-xl">매진</div>
              <div className="swap-off">재고가 있습니다</div>
            </label>
            {/*checked={detailProduct?.isSoldOut}*/}
          </div>
          <div className={'flex'}>
            <img
              src={detailProduct?.thumbnail as string}
              alt={detailProduct?.title}
              className="mr-4 w-[200px]"
            />
            <ImageUpload
              korName="썸네일사진"
              name="thumbnailBase64"
              onChange={handleChange}
            />
          </div>
          <div className="mb-0 flex w-full border-2 border-orange-300">
            <div
              tabIndex={0}
              className="collapse-plus collapse mr-4 w-[400px] border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                상세이미지 보기
              </div>
              <div className="collapse-content flex justify-center">
                <img
                  src={detailProduct?.photo as string}
                  alt={detailProduct?.title}
                  className="h-auto w-[300px]"
                />
              </div>
            </div>
            <div>
              <ImageUpload
                korName="상세사진"
                name="photoBase64"
                onChange={handleChange}
              />
            </div>
          </div>
          <AlertMessage message={message} positive={positive} />
          <div>
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '제품 수정'}
              disabled={isSending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
