import Layout from '../../components/Layout';
import NumberPad from '../../components/NumberPad';
import BigButton from '../../components/BigButton';
import styles from '../../styles/Live.module.css';
import { useState, useEffect } from 'react';

function Live() {
  const [pinAccepted, setPinAccepted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const submitPin = async (pin) => {
    setPinAccepted(true);
    console.log(`submitting ${pin}`);
  };
  const submitName = async (e) => {
    e.preventDefault();
    console.log(`submitting ${playerName}`);
  };
  useEffect(() => {
    console.log(playerName);
  }, [playerName]);
  return (
    <Layout>
      <div className={styles.Live}>
        {!pinAccepted && <NumberPad submitPin={submitPin} />}
        {pinAccepted && (
          <form>
            <input type="text" onInput={(e) => playerName.length < 25 && setPlayerName(e.target.value)} autoFocus />
            <BigButton text="OK" emoji="✨" type="submit" handleClick={submitName} />
          </form>
        )}
      </div>
    </Layout>
  );
}

export default Live;
