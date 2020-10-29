import styles from '../styles/LetterSquare.module.css';

function LetterSquare({ letter, setLetterBeingDragged, dragEnd }) {
  const dragStart = () => {
    setLetterBeingDragged(letter);
  };
  return (
    <div className={styles.LetterSquare} draggable={true} onDragStart={dragStart} onDragEnd={dragEnd}>
      {letter}
    </div>
  );
}

export default LetterSquare;
