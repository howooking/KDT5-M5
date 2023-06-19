import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'toaster',
        }}
      />
      <Navbar />
      <Outlet />
    </>
  );
}
