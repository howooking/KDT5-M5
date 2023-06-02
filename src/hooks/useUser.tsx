import { useEffect } from 'react';
import { userStore } from '../store';

export default function useUser(): {
  userInfo: User;
  logoutUser: () => void;
  isAdmin: boolean;
} {
  const accessToken = localStorage.getItem('token');
  const userInfo = userStore((state) => state.userInfo);
  const logoutUser = userStore((state) => state.logoutUser);
  const authMe = userStore((state) => state.authMe);
  const isAdmin = userInfo.user.email === 'admin@naver.com';

  useEffect(() => {
    if (accessToken === null) {
      logoutUser();
    } else {
      authMe(accessToken);
    }
  }, [accessToken, authMe, logoutUser]);

  return { userInfo, logoutUser, isAdmin };
}
