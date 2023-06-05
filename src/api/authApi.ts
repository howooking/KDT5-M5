const AUTH_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth';

const HEADERS = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
};

// 1. 로그인

// 로그인에 성공시 응답값의 타입
interface SignIResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string;
}

export const signIn = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    // 로그인 성공
    if (res.ok) {
      const user: SignIResponseValue = await res.json();
      return user;
    }

    // 로그인 실패(없는 이메일 or 비번 입력 오류 or 유효성 오류 or api키가 잘못된 경우)
    const error: string = await res.json();
    return error;

    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while login: ', error);
    return '로그인 도중 오류발생, 잠시 후 다시 시도해 주세요';
  }
};

// 2. 회원가입

// 회원가입에 성공시 응답값의 타입
interface SignUpResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string;
}

export const signUp = async (signUpData: {
  email: string;
  password: string;
  displayName: string;
}) => {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
      {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
          displayName: signUpData.displayName,
        }),
      }
    );

    // 회원가입 성공
    if (res.ok) {
      const json: SignUpResponseValue = await res.json();
      console.log(json);
      return json;
    }

    // 회원가입 실패(이미 등록된 이메일 or 유효성 오류 or apikey오류)
    const error: string = await res.json();
    return error;

    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while signup: ', error);
    return '회원가입 도중 오류발생, 잠시 후 다시 시도해 주세요';
  }
};

// 3. 로그아웃
export const logOut = async (accessToken: string | null) => {
  // accessToken 이 없다면 로그아웃상태이므로 함수 종료
  if (!accessToken) {
    return;
  }
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
      {
        method: 'POST',
        headers: {
          ...HEADERS,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const isLoggedOut: boolean = await res.json();
    return isLoggedOut;
  } catch (error) {
    console.log('Error while logout: ', error);
  }
};

// 4. 인증확인

// 인증확인 성공시 응답값의 타입
interface AuthenticateResponseValue {
  email: string;
  displayName: string;
  profileImg: string | null;
}

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
          ...HEADERS,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 유효한 토큰이 맞는 경우
    if (res.ok) {
      const user: AuthenticateResponseValue = await res.json();
      return user;
    }

    // 유효한 토큰이 아닌경우(expired 또는 임의의 토큰을 입력한 경우)
    const error: string = await res.json();
    console.log(error);

    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while authenticate: ', error);
  }
};
