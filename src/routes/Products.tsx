import { useEffect } from 'react';
import { userStore } from '../store';

export default function Products() {
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, [authMe]);
  return <div>{userInfo.user.displayName}</div>;
}
