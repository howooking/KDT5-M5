import { API_URL, HEADERS } from '@/constants/constants';
const MASTER_HEADERS = {
  ...HEADERS,
  masterKey: 'true',
};

interface AddProductResponseValue {
  // 추가한 제품의 상세 내용
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 상세 설명
  tags: string[]; // 제품 태그
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  photo: string | null; // 제품 상세 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  discountRate: number; // 제품 할인율
}
export const addProduct = async (productData: AddProductData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: MASTER_HEADERS,
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      const addedData: AddProductResponseValue = await response.json();
      console.log(addedData);
      return;
    }
    const error: string = await response.json();
    return error;
  } catch (error) {
    console.log('Error while getUser: ', error);
    return '상품 추가 중 에러가 발생하였습니다.';
  }
};

export const updateProduct = async (
  productId: string,
  updateData: UpdatedProduct
) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: MASTER_HEADERS,
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
      headers: MASTER_HEADERS,
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
        headers: MASTER_HEADERS,
      }
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

// 상품 조회
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: MASTER_HEADERS,
    });
    if (res.ok) {
      const products: Product[] = await res.json();
      return products;
    }
    const error = await res.json();
    console.log(error);
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(productId: { text: string }) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      method: 'GET',
      headers: MASTER_HEADERS,
    });
    if (res.ok) {
      const productDetail: ProductDetail = await res.json();
      return productDetail;
    }
  } catch (error) {
    console.log(error);
  }
}
