const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const api_headers = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
  masterKey: 'true',
};

export const addProduct = async (productData: ProductData | undefined) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: api_headers,
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
  updateData: UpdatedProduct
) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: api_headers,
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
    await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: api_headers,
    });
    return true;
  } catch (error) {
    throw new Error('Failed to delete product.');
  }
};

// 유저조회
export const userCheck = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/users',
    {
      method: 'GET',
      headers: api_headers
    }
  )
  const json = await res.json();
  return json;
}