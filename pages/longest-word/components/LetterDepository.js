import styles from '../styles/LetterDepository.module.css';
import { useState } from 'react';

function LetterDepository({ setDroppedLetter, text }) {
  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = () => {
    setDroppedLetter();
  };
  return (
    <div className={styles.LetterDepository} onDragOver={dragOver} onDrop={onDrop}>
      {text === '' ? 'Drag letters here' : text}
    </div>
  );
}

export default LetterDepository;
