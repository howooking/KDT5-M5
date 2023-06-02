import { useState } from 'react';
import { addProduct } from '../../api/adminApi';

const AddProduct = () => {
  const [productData, setProductData] = useState<ProductData>();
  // const [thumbnailBase64, setThumbnailBase64] = useState('');
  // const [photoBase64, setPhotoBase64] = useState('');
  // const handleThumbnailBase64 = (event) => setThumbnailBase64(event.target.value);
  // const handlePhotoBase64 = (event) => setPhotoBase64(event.target.value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await addProduct(productData);
    if (data) {
      console.log(data);
    } else {
      console.error('제품 추가 중 오류 발생');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'price' || event.target.name === 'discountRate') {
      setProductData({
        ...productData,
        [event.target.name]: Number(event.target.value),
      } as ProductData);
    } else {
      setProductData({
        ...productData,
        [event.target.name]: event.target.value,
      } as ProductData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>제품 추가</h3>
      <label>
        제품명:
        <input
          value={productData?.title || ''}
          onChange={handleChange}
          name="title"
        />
      </label>
      <label>
        가격:
        <input
          value={productData?.price || ''}
          onChange={handleChange}
          name="price"
        />
      </label>
      <label>
        설명:
        <input
          value={productData?.description || ''}
          onChange={handleChange}
          name="description"
        />
      </label>
      <label>
        태그:
        <input
          value={productData?.tags || ''}
          onChange={handleChange}
          name="tags"
        />
      </label>
      {/* <label>
        썸네일 이미지 (Base64): <textarea value={thumbnailBase64} onChange={handleThumbnailBase64} />
      </label>
      <label>
        상세 이미지 (Base64): <textarea value={photoBase64} onChange={handlePhotoBase64} />
      </label> */}
      <label>
        할인율:
        <input
          value={productData?.discountRate || ''}
          onChange={handleChange}
          name="discountRate"
        />
      </label>
      <button>제품 추가하기</button>
    </form>
  );
};

export default AddProduct;
