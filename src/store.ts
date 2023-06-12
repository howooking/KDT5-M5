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
  userInfo: null,

  // 로그인(client단에서 user를 세팅함)
  setUser: (user: User) =>
    set(() => ({
      userInfo: user,
    })),

  // 로그아웃
  logoutUser: async () => {
    const accessToken = localStorage.getItem('token');
    await logOut(accessToken);
    // 서버에서 로그아웃이 성공하든 실패(실패할 확률 0)하든 client state 초기화
    set({
      userInfo: null,
    });
    // 로컬저장소 토큰 삭제
    localStorage.removeItem('token');
    // protected route에서 로그아웃 한 경우 강제 새로고침 해야함
    location.reload();
  },

  // 인증
  authMe: async () => {
    const accessToken = localStorage.getItem('token');
    // 로컬저장소에 토큰이 없는경우
    if (!accessToken) {
      // 유져 초기화
      set({
        userInfo: null,
      });
      return;
    }
    // 로컬저장소에 토큰이 있는경우
    const response = await authenticate(accessToken);
    // 인증에 실패하는 경우 경우(유효하지 않은 토큰 or 기타오류)
    if (!response) {
      // 로컬저장소에 무효화된 토큰을 삭제
      localStorage.removeItem('token');
      // 유져 초기화
      set({
        userInfo: null,
      });
      // 인증에 성공하는 경우
    } else {
      // admin여부 확인
      const isAdmin = ADMINS.includes(response.email);
      // 해당유저를 클라이언트 유저상태에 세팅
      set({ userInfo: { user: response, accessToken, isAdmin } });
      // protected route에서 사용할 return 값
      return { user: response, accessToken, isAdmin };
    }
  },
}));
