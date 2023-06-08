const API_BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';


const api_headers = {
  "content-type": "application/json",
  "apikey": "KDT5_nREmPe9B",
  "username": "KDT5_Team1",
};

// 선택 가능한 은행 목록 조회 
export const getBankList = async (accessToken: string): Promise<Bank[]> => {
  const response = await fetch(`${API_BASE_URL}/account/banks`, {
    method: "GET",
    headers: {
      ...api_headers,
      Authorization: `Bearer ${accessToken}`
    }});

  if (response.ok) {
    const data: Bank[] = await response.json();
    return data;
  } else {
    throw new Error("Failed to get bank list");
  }
};

// 계좌 목록 및 잔액 조회 
export const getAccountList = async (accessToken: string): Promise<TotalBalance> => {
  const response = await fetch(`${API_BASE_URL}/account`, {
    method: "GET",
    headers: {
      ...api_headers,
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data: TotalBalance = await response.json();
    return data;
  } else {
    throw new Error("Failed to get account list");
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
  const response = await fetch(`${API_BASE_URL}/account`, {
    method: "POST",
    headers: {
      ...api_headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const data: UserAccount = await response.json();
    return data;
  } else {
    throw new Error("Failed to connect account");
  }
};

// 계좌 해지 
export const deleteAccount = async (
  requestBody: {
    accountId: string;
    signature: boolean;
  },
  accessToken:string
  ): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/account`, {
    method: "DELETE",
    headers: {
      ...api_headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const data: boolean = await response.json();
    return data;
  } else {
    throw new Error("Failed to delete account");
  }
};