interface ButtonProps {
  text: string | JSX.Element;
  secondary?: boolean;
  value?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  disabled?: boolean;
  submit?: boolean;
}

export default function Button({
  text,
  secondary,
  disabled,
  onClick,
  value,
  submit,
}: ButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      value={value}
      disabled={disabled}
      className={`${
        secondary
          ? 'border border-accent text-accent hover:bg-accent/10'
          : 'bg-accent text-white hover:bg-accent/80'
      } h-12 w-full rounded-sm px-4 py-2  disabled:bg-accent/50`}
    >
      {text}
    </button>
  );
}
