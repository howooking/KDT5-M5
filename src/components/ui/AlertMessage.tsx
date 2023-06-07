export default function AlertMessage({ message }: { message: string }) {
  return <div className="h-5 text-xs font-bold text-accent">{message}</div>;
}
