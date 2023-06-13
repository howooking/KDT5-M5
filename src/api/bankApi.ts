import { API_URL, HEADERS } from '@/constants/constants';

// 선택 가능한 은행 목록 조회
export const getBankList = async (accessToken: string): Promise<Bank[]> => {
  const response = await fetch(`${API_URL}/account/banks`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const data: Bank[] = await response.json();
    return data;
  } else {
    throw new Error('Failed to get bank list');
  }
};

// 계좌 목록 및 잔액 조회
export const getAccountsAndBalance = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data: TotalBalance = await response.json();
      return data;
    }
    const error: string = await response.json();
    console.log(error);
  } catch (error) {
    throw new Error('Failed to get account list');
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
): Promise<UserAccount> => {
  console.log('API 호출 전 requestBody: ', requestBody);
  console.log('API 호출 전 accessToken: ', accessToken);
  const response = await fetch(`${API_URL}/account`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  console.log('API 호출 후 response: ', response);

  if (response.ok) {
    const data: UserAccount = await response.json();
    return data;
  } else {
    console.error('API 호출 실패 response: ', response);
    throw new Error('Failed to connect account');
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
      const isDeleted: true = await response.json();
      return isDeleted; // false일리가 없음
    }
    const error: string = await response.json();
    console.log(error);
  } catch (error) {
    console.log(error);
  }
};
