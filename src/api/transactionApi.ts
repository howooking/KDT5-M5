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

    const res = await fetch(`${API_URL}/products/buy`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      const transactionSuccess: boolean = await res.json();
      return { data: transactionSuccess, statusCode: res.status };
    }

    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };
  } catch (error) {
    console.log('Error while buyProduct: ', error);
    return {
      data: '제품 거래 도중 에러 발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
}

export async function getOrderList(accessToken: string) {
  try {
    const res = await fetch(`${API_URL}/products/transactions/details`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      const orderList: TransactionDetail[] = await res.json();
      return { data: orderList, statusCode: res.status };
    }
    console.log('error');
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };
  } catch (error) {
    console.log('Error while buyProduct: ', error);
    return {
      data: '거래내역 조회 중 에러 발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
}
