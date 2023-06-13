interface ButtonProps {
  text: string | JSX.Element;
  secondary?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  disabled?: boolean;
}

export default function Button({
  text,
  secondary,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        secondary
          ? 'border border-accent text-accent hover:bg-accent/10'
          : 'bg-accent text-white hover:bg-accent/80'
      } my-1 h-12 w-full rounded-sm px-4 py-2  disabled:bg-accent/50`}
    >
      {text}
    </button>
  );
}
