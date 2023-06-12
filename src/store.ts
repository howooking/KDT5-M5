import { create } from 'zustand';
import { authenticate, logOut } from '@/api/authApi';
import { ADMINS } from '@/constants/constants';

// user관련 전역state(store)에 무엇이 들어가는지 타입지정
interface UserState {
  userInfo: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
  authMe: () => void | Promise<User | undefined>;
}

export const userStore = create<UserState>((set) => ({
  //유져정보(useState처럼 초기값을 지정해줌)
  // 로컬저장소에 'user'값이 있으면 usrInfo에 해당값을 JSON.parse한 객체를 할당, 없으면 null
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,

  // 로그인(client단에서 user를 세팅함)
  setUser: (user: User) =>
    set({
      userInfo: user,
    }),

  // 로그아웃
  logoutUser: async () => {
    const userInfo: User | null = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;
    // 로컬저장소에 유져정보가 없는 경우(이러한 경우 클라이언트상에서 logoutUser에 접근 할 수 없긴함)
    if (!userInfo) {
      set({
        userInfo: null,
      });
      return;
    }
    // 로컬저장소에 유져정보가 있는 경우
    await logOut(userInfo.accessToken as string);
    // 서버에서 로그아웃이 성공하든 실패(실패할 확률 0)하든 client state 초기화
    set({
      userInfo: null,
    });
    // 로컬저장소 user 삭제
    localStorage.removeItem('user');
    // protected route에서 로그아웃 한 경우 강제 새로고침 해야함
    location.reload();
  },

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
    const response = await authenticate(userInfo.accessToken as string);
    // 인증에 실패하는 경우 경우(유효하지 않은 토큰 or 기타오류)
    if (!response) {
      // 로컬저장소에 무효화된 유져를 삭제
      localStorage.removeItem('user');
      // 유져 초기화
      set({
        userInfo: null,
      });
      // 인증에 성공하는 경우
    } else {
      // admin여부 확인
      const isAdmin = ADMINS.includes(response.email);
      // 해당유저를 클라이언트 유저상태에 세팅
      set({
        userInfo: {
          user: response,
          accessToken: userInfo.accessToken,
          isAdmin,
        },
      });
      // protected route에서 사용할 return 값
      return { user: response, accessToken: userInfo.accessToken, isAdmin };
    }
  },
}));
