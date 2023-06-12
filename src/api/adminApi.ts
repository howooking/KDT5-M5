import { headers, url } from '../constants/constants.ts';
// import AdminFetchProductDetail from './AdminFetchProductDetail.tsx';

// const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

/*const api_headers = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
  masterKey: 'true',
};*/

export const addProduct = async (productData: ProductData | undefined) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to add product.');
  }
};

export const updateProduct = async (
  productId: string,
  updateData: UpdatedProduct,
) => {
  try {
    const response = await fetch(url + `/${productId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update product.');
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await fetch(url + `${productId}`, {
      method: 'DELETE',
      headers,
    });
    return true;
  } catch (error) {
    throw new Error('Failed to delete product.');
  }
};

// 유저조회
export const getUsers = async () => {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/users',
      {
        method: 'GET',
        headers,
      },
    );
    // 유저들 조회가 성공한 경우
    if (res.ok) {
      const users: CheckUser[] = await res.json();
      return users;
    }
    // 유저들 조회가 실패한 경우(masterkey가 없는경우)
    const error: string = await res.json();
    console.log(error);
    // 기타 오류(url이 잘못된경우, aws가 서버다운)
  } catch (error) {
    console.log('Error while getUser: ', error);
  }
};

export const getFetchProducts = async () => {
  try {
    const res =
      await fetch(url, {
        method: 'GET',
        headers,
      });
    if (res.ok) {
      const products: Product[] = await res.json();
      return products;
    }
    const error = await res.json;
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export const getFetchProductDetail = async (productId :ProductId)=>
{
  try {
    const res = await fetch(url + `${productId.text}`, {
      method: 'GET',
      headers,
    });
    if (res.ok) {
      const productDetail: ProductDetail = await res.json();
      return productDetail;
    }
  } catch (error) {
    console.log(error);
  }
}