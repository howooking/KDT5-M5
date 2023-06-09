interface SelectProps {
  options: {
    name: string;
    value: string;
  }[];
}

export default function Select({ options }: SelectProps) {
  return (
    <div className="px-3 py-4 ring-1 ring-gray-400 focus:outline-none">
      <select name="카테고리">
        {options.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}
