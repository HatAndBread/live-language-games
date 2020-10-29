import styles from '../styles/BigButton.module.css';

function BigButton({ text, emoji, handleClick }) {
  return (
    <button className={styles.BigButton} onClick={handleClick}>
      {emoji}
      {text}
      {emoji}
    </button>
  );
}

export default BigButton;
