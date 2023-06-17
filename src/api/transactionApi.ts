// 제품 거래와 관련된 api

import { API_URL, HEADERS } from '@/constants/constants';

export async function searchProducts({ searchText }: { searchText: string }) {
  try {
    const response = await fetch(`${API_URL}/products/search`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ searchText }),
    });
    if (response.ok) {
      const data: Product[] = await response.json();
      return { data, statusCode: response.status, message: '' };
    }
    const errorMessage: string = await response.json();
    return { data: null, statusCode: response.status, message: errorMessage };
  } catch (error) {
    console.log('Error while searching products: ', error);
    return {
      data: null,
      statusCode: 400,
      message: '상품 검색 도중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
}

export async function buyProduct(
  productId: string,
  accountId: string,
  accessToken: string
) {
  try {
    const requestBody = {
      productId,
      accountId,
    };

    const response = await fetch(`${API_URL}/products/buy`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data: true = await response.json();
      return { data, statusCode: response.status, message: '' };
    }

    const errorMessage: string = await response.json();
    return { data: null, statusCode: response.status, message: errorMessage };
  } catch (error) {
    console.log('Error while buyProduct: ', error);
    return {
      data: null,
      statusCode: 400,
      message: '제품 거래 도중 에러 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
}

export async function getOrderList(accessToken: string) {
  try {
    const response = await fetch(`${API_URL}/products/transactions/details`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data: TransactionDetail[] = await response.json();
      return { data, statusCode: response.status, message: '' };
    }
    const errorMessage: string = await response.json();
    return { data: null, statusCode: response.status, message: errorMessage };
  } catch (error) {
    console.log('Error while getting order list: ', error);
    return {
      data: null,
      statusCode: 400,
      message: '주문내역 조회 중 에러 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
}
