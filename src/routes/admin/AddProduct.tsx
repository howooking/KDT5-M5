import { useState } from 'react';
import { addProduct } from '@/api/adminApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ImageUpload from '@/components/ui/ImageUpload';
import Select from '@/components/ui/Select';
import { SELECT_BRAND, SELECT_CATEGORY } from '@/constants/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();

  // 상품의 input값 state, price와 discountRate의 원래 타입은 number이나 일단 string으로 받고 통신을 보낼 때 number로 바꿔줄 예정
  const [productInputData, setProductInputData] = useState<ProductInputData>({
    title: '',
    price: '',
    description: '',
    tags: ['', ''],
    thumbnailBase64: '',
    photoBase64: '',
    discountRate: '',
    isSoldOut: false,
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    // event 중 input 요소뿐만 아니라 select 요소도 있으므로 다음과 같이 generic으로 지정
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    // 이미지 파일
    if (type === 'file') {
      const files = (event.target as HTMLInputElement).files as FileList;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductInputData((prevData) => ({
          ...prevData,
          [name]: reader.result as string,
        }));
      };
      // select로 tags의 element를 지정하는 로직
      // tags = ["카테고리(축구화, 족구화...)", "브랜드(나이키, 아디다스...)"]
    } else if (name === 'category') {
      setProductInputData((prevData) => ({
        ...prevData,
        tags: [value, prevData.tags?.[1] || ''],
      }));
    } else if (name === 'brand') {
      setProductInputData((prevData) => ({
        ...prevData,
        tags: [prevData.tags?.[0] || '', value],
      }));
    } else {
      setProductInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 상품이름 or 상품가격 or 상품설명을 입력하지 않은 경우
    if (
      productInputData.title.trim() === '' ||
      productInputData.price.trim() === '' ||
      productInputData.description.trim() === '' ||
      productInputData.tags[0] === '' ||
      productInputData.tags[0] === 'category' ||
      productInputData.tags[1] === '' ||
      productInputData.tags[1] === 'brand'
    ) {
      toast.error(
        '카테고리, 브랜드, 상품이름, 가격, 상품설명을 모두 입력해주세요.',
        { id: 'addProduct' }
      );
      return;
    }

    // 할인율 0 ~ 99 가 아닌경우
    if (productInputData.discountRate) {
      if (
        !Number(productInputData.discountRate) ||
        Number(productInputData.discountRate) <= 0 ||
        Number(productInputData.discountRate) >= 100
      ) {
        toast.error('할인율은 0 ~ 99를 입력해주세요.', { id: 'addProduct' });
        return;
      }
    }

    setIsSending(true);
    toast.loading('상품 등록 중 입니다.', { id: 'addProduct' });
    const res = await addProduct({
      ...productInputData,
      discountRate: Number(productInputData.discountRate),
      price: Number(productInputData.price),
    });

    // 상품등록이 성공한 경우
    if (res.statusCode === 200) {
      toast.success(res.message, { id: 'addProduct' });
      setIsSending(false);
      navigate(`/products/${res.data?.tags[0]}/${res.data?.id}`);
      return;
    }
    // 상품등록이 실패한 경우
    toast.error(res.message, { id: 'addProduct' });
    setIsSending(false);
  };

  return (
    <div className="container mx-auto px-20 py-4">
      <div className="flex flex-col">
        <SectionTitle text="상품추가" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-10">
            <div className="flex-1 space-y-5">
              <Select
                options={SELECT_CATEGORY}
                onChange={handleChange}
                name="category"
                value={productInputData.tags[0]}
              />
              <Select
                options={SELECT_BRAND}
                onChange={handleChange}
                name="brand"
                value={productInputData.tags[1]}
              />
              <Input
                placeholder="상품이름*"
                name="title"
                onChange={handleChange}
                value={productInputData.title}
              />
              <Input
                placeholder="가격*"
                name="price"
                onChange={handleChange}
                value={productInputData.price}
              />
              <Input
                placeholder="상품설명*"
                name="description"
                onChange={handleChange}
                value={productInputData.description}
              />
              <Input
                placeholder="할인율 (0 ~ 99, 입력 안할 경우 0) "
                name="discountRate"
                onChange={handleChange}
                value={productInputData.discountRate}
              />
            </div>
            <div className="flex flex-1 flex-col space-y-5">
              <ImageUpload
                korName="썸네일사진"
                name="thumbnailBase64"
                onChange={handleChange}
              />
              <ImageUpload
                korName="상세사진"
                name="photoBase64"
                onChange={handleChange}
              />
              <div className="flex-1" />
              <div>
                <Button
                  submit
                  text={
                    isSending ? <LoadingSpinner color="white" /> : '상품등록'
                  }
                  disabled={isSending}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
