import getLetters from './logic/GetLetters';
import BigButton from '../../components/BigButton';
import LetterSquare from './components/LetterSquare';
import LetterDepository from './components/LetterDepository';
import styles from './styles/GameMain.module.css';
import { useEffect, useReducer } from 'react';

const removeLetter = () => {};

const reducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'setLetterBeingDragged':
      newState.letterBeingDragged = action.value;
      return newState;
    case 'dragEnd':
      newState.letterBeingDragged = action.value;
      return newState;
    case 'droppedLetter':
      const arrClone = [...state.letters];
      arrClone.splice(action.value.key, 1);
      newState.letters = arrClone;
      newState.currentWord = state.currentWord + action.value.letter;
      return newState;
    default:
      return state;
  }
};

function Game({ mode }) {
  const [state, dispatch] = useReducer(reducer, {
    letterBeingDragged: { letter: null, key: null },
    currentWord: '',
    letters: getLetters(10)
  });
  const letterSquares = state.letters.map((el, index) => {
    return (
      <LetterSquare
        key={index}
        letter={el}
        setLetterBeingDragged={() => {
          dispatch({ type: 'setLetterBeingDragged', value: { letter: el, key: index } });
        }}
        dragEnd={() => {
          dispatch({ type: 'dragEnd', value: { letter: null, key: null } });
        }}
      />
    );
  });
  useEffect(() => {
    console.dir(state);
  }, [state]);
  const submitWord = async () => {
    let res = await fetch('/api/longest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.currentWord)
    });
    let data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <div>{mode}</div>
      <div className={styles.letterSquares}>{letterSquares}</div>
      <LetterDepository
        text={state.currentWord}
        letterBeingDragged={state.letterBeingDragged}
        setDroppedLetter={() => {
          dispatch({ type: 'droppedLetter', value: state.letterBeingDragged });
        }}
      />
      <BigButton text={'OK'} emoji={'👍'} handleClick={submitWord} />
    </div>
  );
}

export default Game;
