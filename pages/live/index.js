import Layout from '../../components/Layout';
import NumberPad from '../../components/NumberPad';
import BigButton from '../../components/BigButton';
import styles from '../../styles/Live.module.css';
import { useState, useEffect } from 'react';

function Live() {
  const [pinAccepted, setPinAccepted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const submitPin = async (pin) => {
    const raw = await fetch('/api/livelogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: 'pin', pin: pin })
    });
    const response = await raw.json();
    if (response.ok) {
      setPinAccepted(true);
    }
  };
  const submitName = async (e) => {
    e.preventDefault();
    const raw = await fetch('/api/livelogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'name', name: playerName })
    });
    const response = await raw.json();
    console.log(response);
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
            <label htmlFor="playername">Nickname: </label>
            <input
              name="playername"
              type="text"
              onInput={(e) => playerName.length < 25 && setPlayerName(e.target.value)}
              autoFocus
            />
            <BigButton text="OK" emoji="✨" type="submit" handleClick={submitName} />
          </form>
        )}
      </div>
    </Layout>
  );
}

export default Live;
