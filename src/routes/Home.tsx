/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { userStore } from '../store';

export default function Home() {
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  return <div>{userInfo.user.displayName}</div>;
}
