import { create } from 'zustand';
import { authenticate } from '@/api/authApi';
import { ADMINS } from '@/constants/constants';

// user관련 전역state(store)에 무엇이 들어가는지 타입지정
interface UserState {
  userInfo: User | null;
  setUser: (user: User | null) => void;
  authMe: () => void;
}

export const userStore = create<UserState>((set) => ({
  //유져정보(useState처럼 초기값을 지정해줌)
  // 로컬저장소에 'user'값이 있으면 usrInfo에 해당값을 JSON.parse한 객체를 할당, 없으면 null
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,

  // 사용자 세팅
  setUser: (user: User | null) =>
    set({
      userInfo: user,
    }),

  // 인증
  authMe: async () => {
    const userInfo: User | null = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;

    // 로컬저장소에 유져가 없는 경우
    if (!userInfo) {
      // 유져 초기화
      set({
        userInfo: null,
      });
      return;
    }
    // 로컬저장소에 user가 있는 경우
    const res = await authenticate(userInfo.accessToken);
    // access토큰이 없는 경우(누군가 의도적으로 로컬저장소에서 user는 남겨두고 access토큰만 삭제하는 경우)
    if (!res) {
      return;
    }

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
      return;
    }
    // 인증실패(유효한 토큰이 아닌경우, expired)
    // 로컬저장소에 무효화된 유져를 삭제
    localStorage.removeItem('user');
    // 유져 초기화
    set({
      userInfo: null,
    });
  },
}));
