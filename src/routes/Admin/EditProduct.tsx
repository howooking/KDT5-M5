import { useEffect, useState } from 'react';
import { getProductDetail, updateProduct } from '@/api/adminApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import ImageUpload from '@/components/ui/ImageUpload';
import Select from '@/components/ui/Select';
import { SELECT_BRAND, SELECT_CATEGORY } from '@/constants/constants';
import { useLocation } from 'react-router-dom';

export default function EditProduct() {
  const {
    state: { productId, productTitle },
  } = useLocation();
  const [detailProduct, setDetailProduct] = useState<ProductInputData>({
    title: '',
    price: '',
    description: '',
    tags: ['', ''],
    thumbnailBase64: '',
    photoBase64: '',
    discountRate: '',
    isSoldOut: false,
  });
  const [loading, setLoading] = useState(false);
  // 성공적으로 제품을 등록하였을 경우 message색을 초록색으로 바꾸기 위한 state
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  // 2초가 지나면 alert message가 없어지는 기능을 위한 state
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProductDetail(productId);
      if (res) {
        setDetailProduct({
          title: res.title,
          price: res.price.toString(),
          description: res.description,
          tags: res.tags,
          thumbnailBase64: res.thumbnail,
          photoBase64: res.photo,
          discountRate: res.discountRate,
          isSoldOut: res.isSoldOut,
        });
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  // console.log(detailProduct.thumbnailBase64);
  // console.log(btoa(detailProduct.thumbnailBase64 as string));
  // console.log(detailProduct.photoBase64);
  // console.log(btoa(detailProduct.photoBase64 as string));

  const handleImage = () => {
    console.log(productId);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target;
    if (type === 'file') {
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
    } else if (name === 'isSoldOut') {
      setDetailProduct((prevData) => {
        return {
          ...prevData,
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
      detailProduct?.price.trim() === '' ||
      detailProduct?.description.trim() === ''
    ) {
      setMessage('제품이름, 가격, 제품설명을 모두 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 할인율 0 ~ 99 가 아닌경우
    if (detailProduct.discountRate) {
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

    // //////// api 통신 부분 시작
    setIsSending(true);
    const res = await updateProduct(productId, {
      title: detailProduct.title,
      price: Number(detailProduct?.price),
      description: detailProduct?.description,
      tags: detailProduct?.tags,
      // thumbnailBase64: detailProduct?.thumbnailBase64,
      // photoBase64: detailProduct?.photoBase64,
      discountRate: Number(detailProduct?.discountRate),
      isSoldOut: detailProduct?.isSoldOut,
    });
    // 제품등록이 성공한 경우
    if (res) {
      setPositive(true);
      setMessage('제품이 수정되었습니다.');
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
          {loading ? <LoadingSpinner color={'accent'} /> : productTitle}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-10">
            <div className="flex-1  space-y-3">
              <Select
                options={SELECT_CATEGORY}
                onChange={handleChange}
                value={detailProduct?.tags[0]}
              />
              <Select
                options={SELECT_BRAND}
                onChange={handleChange}
                value={detailProduct?.tags[1]}
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
            <div className={'ml-4 flex items-center gap-3'}>
              <input
                type="checkbox"
                checked={detailProduct?.isSoldOut}
                name="isSoldOut"
                onChange={handleChange}
                className={'text-2xl'}
              />
              <label htmlFor={'isSoldOut'} className={'text-2xl text-accent'}>
                {' '}
                {detailProduct.isSoldOut ? '매진' : '재고있슴'}
              </label>
            </div>
          </div>
          <div className={'flex justify-center gap-4'}>
            <div>
              <img src={detailProduct?.thumbnailBase64} alt="" />
            </div>
            <div
              tabIndex={0}
              className="collapse-plus collapse mr-4 w-[400px] border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                상세이미지 보기
              </div>
              <div className="collapse-content flex justify-center">
                <img
                  src={detailProduct?.photoBase64}
                  alt={detailProduct?.title}
                  className="h-auto w-[300px]"
                />
              </div>
            </div>
          </div>

          {/*<div className={'flex'}>
            <img
              src={detailProduct?.thumbnailBase64}
              alt={productTitle}
              className="mr-4 w-[200px]"
            />
            <ImageUpload
              korName="썸네일사진"
              name="thumbnailBase64"
              onChange={handleChange}
            />
          </div>
          <div className="mb-0 flex w-full border-2 border-orange-300">*!/
            <div
              tabIndex={0}
              className="collapse-plus collapse mr-4 w-[400px] border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                상세이미지 보기
              </div>
              <div className="collapse-content flex justify-center">
                <img
                  src={detailProduct?.photoBase64}
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
          </div>*/}
          <div>
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '제품 수정'}
              disabled={isSending}
            />
          </div>
        </form>
        <div>
          <Button text={'이미지 수정'} secondary={true} onClick={handleImage} />
        </div>
      </div>
    </div>
  );
}
