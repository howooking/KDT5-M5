import { useEffect } from 'react';
import { userStore } from '../store';

export default function Home() {
  const authMe = userStore((state) => state.authMe);
  useEffect(() => {
    authMe();
  }, []);

  return <div>Home</div>;
}
