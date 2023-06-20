interface InputProps {
  maxLength?: number;
  placeholder?: string;
  type?: string;
  name: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  type,
  name,
  value,
  maxLength,
  onChange,
}: InputProps) {
  return (
    <input
      maxLength={maxLength}
      placeholder={placeholder}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-4 ring-1 ring-gray-400 focus:outline-none"
    />
  );
}
