import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-lg rounded-md bg-white p-6 shadow-md">
        <h1 className="py-2 text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">
          페당 페이지는 존재하지 않습니다.
        </p>
        <p className="my-4 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button text="뒤로가기" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
