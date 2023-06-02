import { create } from 'zustand';
import { authenticate } from './api/authApi';

interface UserState {
  userInfo: User;
  authMe: (accessToken: string) => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const userStore = create<UserState>((set) => ({
  userInfo: {
    user: {
      email: '',
      displayName: '',
      profileImg: '',
    },
    accessToken: '',
  },
  authMe: async (accessToken: string) => {
    const response = await authenticate(accessToken);
    set({ userInfo: { user: response, accessToken } });
  },
  setUser: (user) =>
    set(() => ({
      userInfo: user,
    })),
  logoutUser: () =>
    set({
      userInfo: {
        user: {
          email: '',
          displayName: '',
          profileImg: '',
        },
        accessToken: '',
      },
    }),
}));
