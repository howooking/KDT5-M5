import React, { useState } from 'react';
import { addProduct } from '../api/adminApi';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [discountRate, setDiscountRate] = useState('');

  const submitProduct = async () => {
    const requestBody = {
      title,
      price,
      description,
      tags: tags.split(','),
      thumbnailBase64,
      photoBase64,
      discountRate
    };
  
    const data = await addProduct(requestBody);
  
    if (data) {
      console.log(data);
    } else {
      console.error('제품 추가 중 오류가 발생했습니다.');
    }
  };

  const handleTitle =(event) => setTitle(event.target.value);
  const handlePrice = (event) => setPrice(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);
  const handleTags = (event) => setTags(event.target.value);
  const handleThumbnailBase64 = (event) => setThumbnailBase64(event.target.value);
  const handlePhotoBase64 = (event) => setPhotoBase64(event.target.value);
  const handleDiscountRate = (event) => setDiscountRate(event.target.value);

  return (
    <div>
      <h3>제품 추가</h3>
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
        할인율:<input type="number" value={discountRate} onChange={handleDiscountRate} />
      </label>
      <button onClick={submitProduct}>제품 추가하기</button>
    </div>
  );
};

export default AddProduct;
