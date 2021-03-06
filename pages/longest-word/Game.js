import getLetters from './logic/GetLetters';
import BigButton from '../../components/BigButton';
import LetterSquare from './components/LetterSquare';
import LetterDepository from './components/LetterDepository';
import EventEmitter from '../../logic/Emitter';
import Timer from './components/Timer';
import styles from './styles/GameMain.module.css';
import { useState, useReducer } from 'react';

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
    case 'roundStarted':
      newState.roundStarted = action.value;
      newState.submitButtonVisible = true;
      return newState;
    case 'roundEnded':
      newState.afterRound = true;
      return newState;
    case 'startNewRound':
      newState.letters = getLetters(12);
      newState.currentWord = '';
      newState.roundStarted = false;
      newState.afterRound = false;
      return newState;
    case 'submitButtonInvisible':
      newState.submitButtonVisible = false;
      return newState;
    default:
      return console.error(`No such action: ${action.type}`);
  }
};

function Game({ mode }) {
  const [time, setTime] = useState(0);
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(20);
  const [state, dispatch] = useReducer(reducer, {
    letterBeingDragged: { letter: null, key: null },
    currentWord: '',
    roundStarted: false,
    afterRound: false,
    submitButtonVisible: false,
    letters: getLetters(12)
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
  const submitWord = async () => {
    EventEmitter.emit('stopTimer');
    dispatch({ type: 'submitButtonInvisible' });
    let res = await fetch('/api/longest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: state.currentWord, time: time, timeLimit: timeLimit })
    });
    let data = await res.json();
    console.log(data);
    if (data.success) {
      setPoints(data.points);
    } else {
      setPoints(0);
    }
    dispatch({ type: 'roundEnded', value: { data } });
  };
  EventEmitter.subscribe('timeUp', () => {
    submitWord();
  });

  return (
    <div>
      <div className={!state.roundStarted ? styles.gameMain : styles.DontShow}>
        <BigButton
          text={'START'}
          emoji={'✨'}
          handleClick={() => {
            dispatch({ type: 'roundStarted', value: true });
            EventEmitter.emit('startTimer');
          }}
        />
      </div>
      <div className={state.roundStarted && !state.afterRound ? styles.gameMain : styles.DontShow}>
        <Timer timeLimit={timeLimit} setTime={setTime} />
        <div className={styles.letterSquares}>{letterSquares}</div>
        <LetterDepository
          text={state.currentWord}
          letterBeingDragged={state.letterBeingDragged}
          setDroppedLetter={() => {
            dispatch({ type: 'droppedLetter', value: state.letterBeingDragged });
          }}
        />
        {state.submitButtonVisible && <BigButton text={'OK'} emoji={'👍'} handleClick={submitWord} />}
      </div>
      <div className={state.roundStarted && state.afterRound ? styles.gameMain : styles.DontShow}>
        <div className={styles.PointsDisplay}>
          {points} points!
          {points === 0 && '😥'}
          {points >= 1000 && points < 9999 && '😃'}
          {points >= 10000 && '🥳'}
        </div>
        <BigButton
          text={'NEXT'}
          emoji={'✨'}
          handleClick={() => {
            dispatch({ type: 'startNewRound' });
          }}
        />
      </div>
    </div>
  );
}

export default Game;
