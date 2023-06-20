import { useEffect, useState } from 'react';
import { getProductDetail, updateProduct } from '@/api/adminApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Select from '@/components/ui/Select';
import { SELECT_BRAND, SELECT_CATEGORY } from '@/constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CrazyLoading from '@/components/ui/CrazyLoading';
import SectionTitle from '@/components/ui/SectionTitle';
import ImageUpload from '@/components/ui/ImageUpload';

export default function EditProduct() {
  const navigate = useNavigate();
  // navigate로부터 받은 state정보들
  const {
    state: { productId, productTitle },
  } = useLocation();

  // 얘도 일단은 모두 string으로 초기값 세팅
  const [detailProduct, setDetailProduct] = useState<EditProductInputData>({
    title: '',
    price: '',
    description: '',
    tags: ['', ''],
    thumbnailBase64: '',
    photoBase64: '',
    discountRate: '',
    isSoldOut: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isImageUpdate, setIsImageUpdate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const res = await getProductDetail(productId);
      if (res.statusCode === 200) {
        const data = res.data as ProductDetail;
        setDetailProduct({
          // string이 아닌 항목은 string으로 변환후 세팅해줌
          title: data.title,
          price: data.price.toString(),
          description: data.description,
          tags: data.tags,
          thumbnailBase64: data.thumbnail,
          photoBase64: data.photo,
          discountRate: data.discountRate.toString(),
          isSoldOut: data.isSoldOut.toString(),
        });
        setIsLoading(false);
        return;
      }
      toast.error(res.message, { id: 'getProductDetail' });
      setIsLoading(false);
    };
    fetchProducts();
  }, [productId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setIsImageUpdate(false);
    if (type === 'file') {
      // 이미지를 업로드 여부를 state로 관리
      setIsImageUpdate(true);
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

    // 상품이름 or 상품가격 or 상품설명을 입력하지 않은 경우
    if (
      detailProduct?.title.trim() === '' ||
      detailProduct?.price.trim() === '' ||
      detailProduct?.description.trim() === ''
    ) {
      toast.error('상품이름, 가격, 상품설명을 모두 입력해주세요.', {
        id: 'updateProduct',
      });
      return;
    }

    // 할인율 0 ~ 99 가 아닌경우
    if (
      Number(detailProduct.discountRate) < 0 ||
      Number(detailProduct.discountRate) >= 100
    ) {
      toast.error('할인율은 0 ~ 99를 입력해주세요.', { id: 'updateProduct' });
      return;
    }
    setIsSending(true);
    const res = await updateProduct(
      productId,
      // 이미지를 업로드 한 경우에만 'thumbnailBase64', 'photoBase64' 키값을 추가해서 보냄
      // 그런데 두개의 이미지 중에 하나만 업로드를 할 경우 나머지 하나의 값이 base64가 아니기 때문에 에러가 발생함.
      // 따라서 수정할거라면 두개 다 업로드해야함.
      isImageUpdate
        ? {
            title: detailProduct.title,
            price: Number(detailProduct.price),
            description: detailProduct.description,
            tags: detailProduct.tags,
            discountRate: Number(detailProduct?.discountRate),
            isSoldOut: detailProduct.isSoldOut === 'true',
            thumbnailBase64: detailProduct?.thumbnailBase64,
            photoBase64: detailProduct?.photoBase64,
          }
        : {
            title: detailProduct.title,
            price: Number(detailProduct.price),
            description: detailProduct.description,
            tags: detailProduct.tags,
            discountRate: Number(detailProduct?.discountRate),
            isSoldOut: detailProduct.isSoldOut === 'true',
          }
    );
    if (res.statusCode === 200) {
      toast.success(res.message, { id: 'updateProduct' });
      setIsSending(false);
      navigate(`/products/${detailProduct.tags[0]}/${productId}`);
      return;
    }
    toast.error(res.message, { id: 'updateProduct' });
    setIsSending(false);
  };

  return (
    <>
      {isLoading ? (
        <CrazyLoading />
      ) : (
        <div className="container mx-auto px-20 py-10">
          <div className="flex flex-col">
            <SectionTitle text={productTitle} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-10">
                <div className="flex-1 space-y-5">
                  <Select
                    name="category"
                    options={SELECT_CATEGORY}
                    onChange={handleChange}
                    value={detailProduct.tags[0]}
                  />
                  <Select
                    name="brand"
                    options={SELECT_BRAND}
                    onChange={handleChange}
                    value={detailProduct.tags[1]}
                  />
                  <Input
                    placeholder="상품이름*"
                    name="title"
                    onChange={handleChange}
                    value={detailProduct.title}
                  />
                  <Input
                    placeholder="가격*"
                    name="price"
                    onChange={handleChange}
                    value={detailProduct.price}
                  />
                  <Input
                    placeholder="상품설명*"
                    name="description"
                    onChange={handleChange}
                    value={detailProduct.description}
                  />
                  <Input
                    placeholder="할인율 (0 ~ 99, 입력 안할 경우 0) "
                    name="discountRate"
                    onChange={handleChange}
                    value={detailProduct.discountRate}
                  />
                  <Select
                    name="isSoldOut"
                    onChange={handleChange}
                    options={[
                      { name: '재고 있음', value: 'false' },
                      { name: '재고 없음', value: 'true' },
                    ]}
                    value={detailProduct.isSoldOut}
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
                      text={
                        isSending ? (
                          <LoadingSpinner color="white" />
                        ) : (
                          '상품 수정'
                        )
                      }
                      disabled={isSending}
                      submit
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
