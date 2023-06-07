import React, { useState } from 'react';
import { updateProduct } from '../../api/adminApi';

const UpdateProduct: React.FC<ProductId> = ({ productId }) => {
  const [product, setProduct] = useState<UpdatedProduct>({});
  const [rawTags, setRawTags] = useState<string>('');
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, checked } = e.target;

  if (name === 'isSoldOut') {
    setProduct((prevProduct) => ({ ...prevProduct, [name]: checked }));
  } else if (name !== 'tags') {
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsArray = rawTags.split(',').map((tag) => tag.trim());
    const updateData = {
      ...product,
      tags: tagsArray,
    };

    const data = await updateProduct(productId, updateData);

    if (data) {
      console.log(data);
    } else {
      console.error('제품 수정 중 오류가 발생.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>제품 수정</h3>
      <label>제품 ID:</label>
      <input id="productId" name="productId" onChange={handleChange} />
      <label>
        제품명: 
        <input 
        name="title" 
        value={product.title || ''} 
        onChange={handleChange} />
      </label>
      <label>
        가격: 
        <input 
        name="price" 
        value={product.price || ''} 
        onChange={handleChange} />
      </label>
      <label>
        설명: 
        <input 
        name="description" 
        value={product.description || ''} 
        onChange={handleChange} />
      </label>
      <label>
        태그: 
        <input 
        name="tags" 
        value={rawTags} 
        onChange={handleChange} />
      </label>
      {/* <label>
        썸네일 이미지 (Base64): <input name="thumbnailBase64" value={product.thumbnailBase64 || ''} onChange={handleChange} />
      </label>
      <label>
        상세 이미지 (Base64): <input name="photoBase64" value={product.photoBase64 || ''} onChange={handleChange} />
      </label> */}
      <label>
        매진 여부: 
        <input 
        type="checkbox" 
        name="isSoldOut" 
        checked={product.isSoldOut || false} 
        onChange={handleChange} />
      </label>
      <label>
        할인율: 
        <input 
        name="discountRate" 
        value={product.discountRate || ''} 
        onChange={handleChange} />
      </label>
      <button>제품 수정하기</button>
    </form>
  );
};

export default UpdateProduct;
