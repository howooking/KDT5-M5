// CSS적용 예시입니다.
// Button.module.css와 index.cee참고

interface ButtonProps {
  text: string | JSX.Element;
  secondary?: boolean;
  onClick?: (event: React.FormEvent<HTMLFormElement> | void) => void;
  disabled?: boolean;
}

export default function Button({ text, secondary, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${
        secondary
          ? 'bg-gray-700 hover:bg-gray-700/80'
          : 'bg-accent  hover:bg-accent/80'
      } my-1 h-12 w-full rounded-sm px-4 py-2 text-white disabled:bg-accent/50`}
    >
      {text}
    </button>
  );
}
