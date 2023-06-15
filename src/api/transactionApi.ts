// 제품 거래와 관련된 api

import { API_URL, HEADERS } from '@/constants/constants';

export async function searchProducts({ searchText }: { searchText: string }) {
  try {
    const res = await fetch(`${API_URL}/products/search`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ searchText }),
    });
    if (res.ok) {
      const products: Product[] = await res.json();
      return { data: products, statusCode: res.status };
    }
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };
  } catch (error) {
    console.log('Error while getUser: ', error);
    return {
      data: '상품 검색 도중 에러발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
}
