import BigButton from '../components/BigButton';
import styles from '../styles/GameMenu.module.css';
import { useState } from 'react';

function GameMenu({ title, setMode, setGameReady }) {
  const [show, setShow] = useState(true);
  const singlePlayerClick = () => {
    setShow(false);
    setMode('single');
    setGameReady(true);
  };
  const hostGameClick = () => {
    setShow(false);
    setMode('host');
  };
  return (
    <div>
      {show && (
        <div className={styles.GameMenu}>
          <div>{title}</div>
          <BigButton text="Single Player" emoji="💃" handleClick={singlePlayerClick} />
          <BigButton text="Host Game" emoji="👯‍♀️" handleClick={hostGameClick} />
        </div>
      )}
    </div>
  );
}

export default GameMenu;
