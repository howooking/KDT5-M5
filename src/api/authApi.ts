const headers = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
};

// 로그인
interface LoginDataType {
  email: string;
  password: string;
}

export const signIn = async (loginData: LoginDataType) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    }
  );
  const json = await res.json();
  return json;
};

// 회원가입
interface SignUpDataType {
  email: string;
  password: string;
  displayName: string;
}

export const signUp = async (signUpData: SignUpDataType) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: signUpData.email,
        password: signUpData.password,
        displayName: signUpData.displayName,
      }),
    }
  );
  const json = await res.json();
  return json;
};

//로그아웃
export const logout = async (accessToken: string | null) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
    {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

// 인증확인
export const authenticate = async (accessToken: string) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
  return json;
};
