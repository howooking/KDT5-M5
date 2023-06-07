// CSS적용 예시입니다.
// Button.module.css와 index.cee참고
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: string;
}

export default function Button({ text, onClick, type }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        backgroundColor: type === 'primary' ? 'palegreen' : '',
      }}
    >
      {text}
    </button>
  );
}
