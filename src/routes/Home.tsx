/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { userStore } from '../store';
import Carousel from 'nuka-carousel';
import Slider from '../components/Slider';

export default function Home() {
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, []);
  return <Slider />;
}
