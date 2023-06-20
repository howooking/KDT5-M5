import { API_URL, HEADERS } from '@/constants/constants';
const MASTER_HEADERS = {
  ...HEADERS,
  masterKey: 'true',
};

export const addProduct = async (productData: AddProductData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: MASTER_HEADERS,
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      const data: AddProductResponseValue = await response.json();
      return {
        data,
        statusCode: response.status,
        message: `${data.title}를 추가하였습니다.`,
      };
    }
    const errorMessage: string = await response.json();
    return {
      data: null,
      statusCode: response.status,
      message: errorMessage,
    };
  } catch (error) {
    console.log('Error while adding product: ', error);
    return {
      data: null,
      statusCode: 400,
      message: '상품을 추가 중 에러발생, 잠시 후 다시 시도해 주세요',
    };
  }
};

// 수정 예정
export const updateProduct = async (
  productId: string,
  updateData: UpdateProductBodyData
) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: MASTER_HEADERS,
      body: JSON.stringify(updateData),
    });
    if (response.ok) {
      const data: UpdatedProduct = await response.json();
      return {
        data,
        statusCode: response.status,
        message: `${data.title} 상품을 수정하였습니다.`,
      };
    }
    const errorMessage = await response.json();
    return {
      data: null,
      statusCode: response.status,
      message: errorMessage,
    };
  } catch (error) {
    console.log('error while updating a product');
    return {
      data: null,
      statusCode: 400,
      message: '제품 수정 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: MASTER_HEADERS,
    });
    if (response.ok) {
      const data: true = await response.json();
      return {
        data,
        statusCode: response.status,
        message: '',
      };
    }
    const errorMessage: string = await response.json();
    return {
      data: null,
      statusCode: response.status,
      message: errorMessage,
    };
  } catch (error) {
    return {
      data: null,
      statusCode: 400,
      message: '상품 삭제 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};

// 유저조회
export const getClients = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/users`, {
      method: 'GET',
      headers: MASTER_HEADERS,
    });
    // 유저들 조회가 성공한 경우
    if (res.ok) {
      const data: Client[] = await res.json();
      return {
        data,
        statusCode: res.status,
        message: '',
      };
    }
    // 유저들 조회가 실패한 경우(masterkey가 없는경우)
    const errorMessage: string = await res.json();
    return {
      data: null,
      statusCode: res.status,
      message: errorMessage,
    };
    // 기타 오류(url이 잘못된경우, 서버다운)
  } catch (error) {
    console.log('Error while getUser: ', error);
    return {
      data: null,
      statusCode: 400,
      message: '회원 조회 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
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
      const data: Product[] = await res.json();
      return {
        data,
        statusCode: res.status,
        message: '',
      };
    }
    const error: string = await res.json();
    return {
      data: null,
      statusCode: res.status,
      message: error,
    };
  } catch (error) {
    return {
      data: null,
      statusCode: 400,
      message: '상품 목록 조회 중 오류 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
}

export async function getProductDetail(productId: string) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      method: 'GET',
      headers: MASTER_HEADERS,
    });
    if (res.ok) {
      const data: ProductDetail = await res.json();
      return {
        data,
        statusCode: res.status,
        message: '',
      };
    }
    const errorMessage: string = await res.json();
    return {
      data: null,
      statusCode: res.status,
      message: errorMessage,
    };
  } catch (error) {
    console.log('error while getting a product', error);
    return {
      data: null,
      statusCode: 400,
      message: '개별 상품 조회 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
}

export const getAllTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/products/transactions/all`, {
      method: 'GET',
      headers: MASTER_HEADERS,
    });

    if (response.ok) {
      const data: TransactionDetail[] = await response.json();
      return {
        data,
        statusCode: response.status,
        message: '',
      };
    }

    const errorMessage: string = await response.json();
    return {
      data: null,
      statusCode: response.status,
      message: errorMessage,
    };
  } catch (error) {
    console.log('Error while fetching all transactions: ', error);
    return {
      data: null,
      statusCode: 400,
      message:
        '전체 거래 내역을 불러오는 중 오류 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};
