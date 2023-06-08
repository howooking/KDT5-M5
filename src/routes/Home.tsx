/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { userStore } from '../store';
import Slider from '../components/Slider';

export default function Home() {
  const { authMe } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  return <Slider />;
}
