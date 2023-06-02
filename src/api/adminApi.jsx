const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const api_headers = {
  "content-type": "application/json",
  "apikey": "KDT5_nREmPe9B",
  "username": "KDT5_Team1",
  "masterKey": "true"
};

export const addProduct = async (productData) => {
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

export const updateProduct = async (productId, updateData) => {
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

export const deleteProduct = async (productId) => {
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
