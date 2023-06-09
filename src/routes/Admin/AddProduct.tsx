import { useState } from 'react';
import { addProduct } from '../../api/adminApi';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AlertMessage from '../../components/ui/AlertMessage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ImageUpload from '../../components/ui/ImageUpload';
import Select from '../../components/ui/Select';
import { SELECT_BRAND, SELECT_CATEGORY } from '../../constants/constants';

export default function AddProduct() {
  const [productInputData, setProductInputData] = useState<ProductInputData>();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  console.log(Number(productInputData?.discountRate));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      const files = event.target.files as FileList;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductInputData(
          (prevData) =>
            ({
              ...prevData,
              [name]: reader.result as string,
            } as ProductInputData)
        );
      };
    } else {
      setProductInputData(
        (prevData) =>
          ({
            ...prevData,
            [name]: value,
          } as ProductInputData)
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 이전 타임아웃이 아직 작동중이 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    //// 클라이언트 사이드 유효성 검사

    // 제품이름 or 제품가격 or 제품설명을 입력하지 않은 경우
    if (
      productInputData?.title.trim() === '' ||
      !productInputData?.price ||
      productInputData?.description.trim() === ''
    ) {
      setMessage('제품이름, 가격, 제품설명을 모두 입력해주세요.');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 할인율 0 ~ 99 가 아닌경우
    if (productInputData?.discountRate) {
      if (!Number(productInputData.discountRate)) {
        setMessage('할인율은 숫자값을 입력해주세요.');
        const id = setTimeout(() => {
          setMessage('');
        }, 2000);
        setTimeoutId(id);
        return;
      }
      if (
        Number(productInputData.discountRate) <= 0 ||
        Number(productInputData.discountRate) >= 100
      ) {
        setMessage('할인율은 0 ~ 99 사이값으로 입력해주세요.');
        const id = setTimeout(() => {
          setMessage('');
        }, 2000);
        setTimeoutId(id);
        return;
      }
    }

    setIsSending(true);
    const res = await addProduct({
      description: productInputData.description,
      price: Number(productInputData.price),
      title: productInputData.title,
      discountRate: Number(productInputData.discountRate),
      photoBase64: productInputData.photoBase64,
      tags: productInputData.tags,
      thumbnailBase64: productInputData.thumbnailBase64,
    });
    // 제품등록이 성공한 경우
    if (!res) {
      setMessage('제품을 등록하였습니다.');
      setIsSending(false);
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      setProductInputData({
        description: '',
        price: '',
        title: '',
        discountRate: '',
        photoBase64: '',
        tags: [],
        thumbnailBase64: '',
      });
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

  return (
    <div className="flex justify-center p-3">
      <div className="flex flex-col">
        <h3 className="py-3 text-3xl text-gray-800">제품 추가</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-10">
            <div className="flex-1  space-y-3">
              <Select options={SELECT_CATEGORY} />
              <Select options={SELECT_BRAND} />
              <Input
                placeholder="제품이름*"
                name="title"
                onChange={handleChange}
                value={productInputData?.title}
              />
              <Input
                placeholder="가격*"
                name="price"
                onChange={handleChange}
                value={productInputData?.price}
              />
              <Input
                placeholder="제품설명*"
                name="description"
                onChange={handleChange}
                value={productInputData?.description}
              />
              <Input
                placeholder="할인율 (0 ~ 99, 입력 안할 경우 0) "
                name="discountRate"
                onChange={handleChange}
                value={productInputData?.discountRate}
              />
            </div>
            <div className="flex-1  space-y-3">
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
            </div>
          </div>
          <AlertMessage message={message} />
          <div>
            <Button
              text={isSending ? <LoadingSpinner color="white" /> : '상품등록'}
              disabled={isSending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
