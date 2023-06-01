import React, { useState } from 'react';
import { updateProduct } from '../api/adminApi';

const UpdateProduct = ({ productId }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [discountRate, setDiscountRate] = useState('');

  const handleTitle = (event) => setTitle(event.target.value);
  const handlePrice = (event) => setPrice(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);
  const handleTags = (event) => setTags(event.target.value);
  const handleThumbnailBase64 = (event) => setThumbnailBase64(event.target.value);
  const handlePhotoBase64 = (event) => setPhotoBase64(event.target.value);
  const handleIsSoldOut = (event) => setIsSoldOut(event.target.checked);
  const handleDiscountRate = (event) => setDiscountRate(event.target.value);

  const submitProduct = async () => {
    const updateData = {
      title,
      price,
      description,
      tags: tags.split(','),
      thumbnailBase64,
      photoBase64,
      isSoldOut,
      discountRate
    };

    const data = await updateProduct(productId, updateData);

    if (data) {
      console.log('제품이 성공적으로 수정되었습니다:', data);
    } else {
      console.error('제품 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h3>제품 수정</h3>
      <label>
        제품명: <input type="text" value={title} onChange={handleTitle} />
      </label>
      <label>
        가격: <input type="number" value={price} onChange={handlePrice} />
      </label>
      <label>
        설명: <textarea value={description} onChange={handleDescription} />
      </label>
      <label>
        태그: <input type="text" value={tags} onChange={handleTags} />
      </label>
      <label>
        썸네일 이미지 (Base64): <textarea value={thumbnailBase64} onChange={handleThumbnailBase64} />
      </label>
      <label>
        상세 이미지 (Base64): <textarea value={photoBase64} onChange={handlePhotoBase64} />
      </label>
      <label>
        매진 여부: <input type="checkbox" checked={isSoldOut} onChange={handleIsSoldOut} />
      </label>
      <label>
        할인율: <input type="number" value={discountRate} onChange={handleDiscountRate} />
      </label>
      <button onClick={submitProduct}>제품 수정하기</button>
    </div>
  );
};

export default UpdateProduct;
