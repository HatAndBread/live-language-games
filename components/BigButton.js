import styles from '../styles/BigButton.module.css';

function BigButton({ text, emoji, type, handleClick }) {
  return (
    <button className={styles.BigButton} onClick={handleClick} onSubmit={handleClick} type={type ? type : 'button'}>
      {emoji}
      {text}
      {emoji}
    </button>
  );
}

export default BigButton;
