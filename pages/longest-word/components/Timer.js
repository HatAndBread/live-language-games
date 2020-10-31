import { useState, useEffect, useRef } from 'react';
import EventEmitter from '../../../logic/Emitter';
import styles from '../styles/GameMain.module.css';

function Timer({ timeLimit, setTime }) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);
  const timerStoppedRef = useRef(timerStopped);
  timerStoppedRef.current = timerStopped;
  const count = () => {
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
  EventEmitter.subscribe('stopTimer', () => {
    setTimerStopped(true);
  });
  useEffect(() => {
    count();
  }, []);
  return <div className={styles.Timer}>{timeElapsed}</div>;
}

export default Timer;
