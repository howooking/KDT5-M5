interface AlertMessageProps {
  message: string;
  positive?: boolean;
}

export default function AlertMessage({ message, positive }: AlertMessageProps) {
  return (
    <div
      className={`h-5 text-xs font-bold  ${
        positive ? 'text-green-500' : 'text-accent'
      }`}
    >
      {message}
    </div>
  );
}
