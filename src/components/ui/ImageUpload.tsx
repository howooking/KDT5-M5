interface ImageUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  korName: string;
}

export default function ImageUpload({
  name,
  onChange,
  korName,
}: ImageUploadProps) {
  return (
    <div className="w-full px-3 py-3 ring-1 ring-gray-400">
      <label htmlFor={name}>{korName} </label>
      <br />
      <input id={name} type="file" name={name} onChange={onChange} />
    </div>
  );
}
