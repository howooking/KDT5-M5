import { API_URL, HEADERS } from '@/constants/constants';

// 선택 가능한 은행 목록 조회
export const getBankList = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/account/banks`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data: Bank[] = await response.json();
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
    console.log('error while getting banks', error);
    return {
      data: null,
      statusCode: 400,
      message: '은행 목록 조회 중 에러 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};

// 계좌 목록 및 잔액 조회
export const getAccountListAndBalance = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data: AccountsAndBalance = await response.json();
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
    console.log('error while getting account lists and balance', error);
    return {
      data: null,
      statusCode: 400,
      message: '계좌 조회 중 에러 발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};

// 계좌 연결
export const connectAccount = async (
  requestBody: {
    bankCode: string;
    accountNumber: string;
    phoneNumber: string;
    signature: boolean;
  },
  accessToken: string
) => {
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      const data: UserAccount = await response.json();
      return {
        data,
        statusCode: response.status,
        message: `${data.bankName}계좌를 추가하셨습니다.`,
      };
    }
    const errorMessage: string = await response.json();
    return {
      data: null,
      statusCode: response.status,
      message: errorMessage,
    };
  } catch (error) {
    console.log('error while conncting bank account', error);
    return {
      data: null,
      statusCode: 400,
      message: '계좌 추가 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};

// 계좌 해지
export const deleteAccount = async (
  requestBody: {
    accountId: string;
    signature: boolean;
  },
  accessToken: string
) => {
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: 'DELETE',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
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
    console.log('error while deleting an account', error);
    return {
      data: null,
      statusCode: 400,
      message: '계좌 삭제 중 에러발생, 잠시 후 다시 시도해 주세요.',
    };
  }
};
