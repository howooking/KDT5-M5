interface InputProps {
  placeholder?: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  type,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col pb-2">
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-4 ring-1 ring-gray-400 focus:outline-none"
      />
    </div>
  );
}
