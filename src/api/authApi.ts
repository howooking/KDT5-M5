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
  try {
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
    // 로그인 성공
    if (res.ok) {
      const json = await res.json();
      return json;
      //     interface ResponseValue {
      //   user: {
      //     email: string
      //     displayName: string
      //     profileImg: string | null
      //   }
      //   accessToken: string
      // }
    }

    // 로그인 실패(없는 이메일 or 비번 입력 오류)
    const json = await res.json();
    return json;
    // 유효한 사용자 입니다 or 이메일 혹은 비밀번호가 일치하지 않습니다.

    // 기타 오류
  } catch (error) {
    console.log(error, 'error while login!');
  }
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
  if (!accessToken) {
    return;
  }
  try {
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
    // ResponseValue = true
    return json;
  } catch (error) {
    console.log(error, 'error while logout');
  }
};

// 인증확인
export const authenticate = async (accessToken: string | null) => {
  // 토큰이 없는 경우, 이미 요청단계에서 rule out되긴함
  if (!accessToken) {
    return;
  }
  // 토큰이 있는경우
  try {
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
    // 유효한 토큰이 맞는 경우
    if (res.ok) {
      const json = await res.json();
      return json;
      // interface ResponseValue {
      //   email: string;
      //   displayName: string;
      //   profileImg: string | null;
      // }
    }
    // 유효한 토큰이 아닌경우
    console.log('token expired');
    return;
    // 그밖의 에러
  } catch (error) {
    console.log(error, 'error while authenticate');
  }
};
