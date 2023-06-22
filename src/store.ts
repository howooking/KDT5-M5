import { create } from 'zustand';
import { authenticate } from '@/api/authApi';
import { ADMINS } from '@/constants/constants';

// user관련 전역state(store)에 무엇이 들어가는지 타입지정
interface UserState {
  userInfo: LocalUser | null;
  setUser: (user: LocalUser | null) => void;
  authMe: () => Promise<string | undefined>;
}

export const userStore = create<UserState>((set) => ({
  //유져정보(useState처럼 초기값을 지정해줌)
  // 로컬저장소에 'user'값이 있으면 usrInfo에 해당값을 JSON.parse한 객체를 할당, 없으면 null
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,

  // 사용자 세팅
  setUser: (user: LocalUser | null) =>
    set({
      userInfo: user,
    }),

  // 인증
  authMe: async () => {
    // 로컬저장소에 'user'가 있다면 json.parse시켜 객체로 만들고 useInfo에 저장 / 없다면 useInfo에 null
    const userInfo: LocalUser | null = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;

    // 로컬저장소에 유져가 없는 경우
    if (!userInfo) {
      // 유져 초기화
      set({
        userInfo: null,
      });
      return '로그인을 해주세요.';
    }
    // 로컬저장소에 user가 있는 경우
    const res = await authenticate(userInfo.accessToken);
    // 인증에 성공하는 경우
    if (res.statusCode === 200) {
      const user = res.data as AuthenticateResponseValue;
      const isAdmin = ADMINS.includes(user.email);
      // 해당유저를 클라이언트 전역 유저상태에 세팅
      set({
        userInfo: {
          user: user,
          accessToken: userInfo.accessToken,
          isAdmin,
        },
      });
      // 로컬 저장소에도 세팅
      localStorage.setItem(
        'user',
        JSON.stringify({ user, accessToken: userInfo.accessToken, isAdmin })
      );

      return;
    }
    // 토큰은 있으나 인증에 실패한 경우 (expired or 토큰 값 인위적 조작)
    set({
      userInfo: null,
    });
    localStorage.removeItem('user');
    return '로그인 하신지 24시간이 지나셨어요! 다시 로그인해주세요.';
  },
}));
