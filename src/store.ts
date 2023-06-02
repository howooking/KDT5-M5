import { create } from 'zustand';
import { authenticate } from './api/api';

interface UserState {
  userInfo: User;
  authMe: () => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const accessToken = localStorage.getItem('token');

export const userStore = create<UserState>((set) => ({
  userInfo: {
    user: {
      email: '',
      displayName: '',
      profileImg: '',
    },
    accessToken: accessToken,
  },
  authMe: async () => {
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
