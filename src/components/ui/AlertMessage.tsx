export default function AlertMessage({ message }: { message: string }) {
  return (
    <div
      className={`h-5 text-xs font-bold  ${
        message === '제품을 등록하였습니다.' ? 'text-green-500' : 'text-accent'
      }`}
    >
      {message}
    </div>
  );
}
