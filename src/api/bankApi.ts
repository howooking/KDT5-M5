import axios from 'axios';

const API_BASE_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

export const fetchBanks = async (): Promise<Bank[]> => {
  const response = await axios.get(`${API_BASE_URL}/account/banks`, {
    headers: {
      Authorization: `Bearer <accessToken>`
    }
  });

  return response.data;
};

export const fetchAccounts = async (): Promise<AccountList> => {
  const response = await axios.get(`${API_BASE_URL}/account`, {
    headers: {
      Authorization: `Bearer <accessToken>`
    }
  });

  return response.data;
};

export const addAccount = async (newAccount: {
  bankCode: string;
  accountNumber: string;
  phoneNumber: string;
  signature: boolean;
}): Promise<Account> => {
  const response = await axios.post(
    `${API_BASE_URL}/account`,
    newAccount,
    {
      headers: {
        Authorization: `Bearer <accessToken>`
      }
    }
  );

  return response.data;
};

export const deleteAccount = async (accountId: string): Promise<boolean> => {
  const response = await axios.delete(`${API_BASE_URL}/account`, {
    headers: {
      Authorization: `Bearer <accessToken>`
    },
    data: {
      accountId,
      signature: true
    }
  });

  return response.data;
};
