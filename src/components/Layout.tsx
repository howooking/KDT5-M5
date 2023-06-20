import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'toaster',
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
