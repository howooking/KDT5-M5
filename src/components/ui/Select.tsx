import { IoIosArrowDown } from 'react-icons/io';

interface SelectProps {
  options: {
    name: string;
    value: string | boolean;
  }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export default function Select({ options, onChange, value }: SelectProps) {
  return (
    <div className="relative block">
      <select
        value={value}
        name={options[0].value}
        onChange={onChange}
        className="block w-full appearance-none px-3 py-4 shadow ring-1 ring-gray-400 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-5">
        <IoIosArrowDown />
      </div>
    </div>
  );
}
