// CSS적용 예시입니다.
// Button.module.css와 index.cee참고
import styles from './Button.module.css';

export default function Button({ text }: { text: string }) {
  return (
    <button className={styles.button}>
      {text}
      <span className={styles.span}>"버!튼"</span>
    </button>
  );
}
