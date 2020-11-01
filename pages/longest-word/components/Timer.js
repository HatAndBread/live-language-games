import { useState, useEffect, useRef } from 'react';
import EventEmitter from '../../../logic/Emitter';
import styles from '../styles/GameMain.module.css';

function Timer({ timeLimit, setTime }) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [timerStopped, setTimerStopped] = useState(true);
  const timerStoppedRef = useRef(timerStopped);
  timerStoppedRef.current = timerStopped;
  const count = () => {
    setTimeElapsed(0);
    let i = 1;
    const increaseTime = () => {
      if (i <= timeLimit && !timerStoppedRef.current) {
        setTimeout(() => {
          setTimeElapsed(i);
          if (!timerStoppedRef.current) {
            setTime(i);
            i += 1;
            increaseTime();
          }
        }, 1000);
      }
    };
    increaseTime();
  };

  useEffect(() => {
    !timerStopped && count();
    setTimeElapsed(0);
  }, [timerStopped]);
  useEffect(() => {
    if (timeElapsed === timeLimit) {
      setShowTimer(false);
      setTimeElapsed(0);
      setTimerStopped(true);
      EventEmitter.emit('timeUp');
    }
  }, [timeElapsed]);
  EventEmitter.subscribe('stopTimer', () => {
    setShowTimer(false);
    setTimeElapsed(0);
    setTimerStopped(true);
  });
  EventEmitter.subscribe('startTimer', () => {
    setShowTimer(true);
    setTimerStopped(false);
    count();
  });
  return (
    <div>
      {showTimer ? (
        <div className={styles.Timer}>{timeElapsed}</div>
      ) : (
        <div className={styles.Calculating}>Calculating your score...</div>
      )}
    </div>
  );
}

export default Timer;
