import styles from '../styles/NumberPad.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

function NumberPad() {
  const [pin, setPin] = useState('');
  const handleClick = (e) => {
    const text = e.target.innerText;
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (nums.includes(text)) {
      pin.length < 5 && setPin(pin + text);
    } else if (text === '←') {
      const alteredPin = pin.slice(0, -1);
      setPin(alteredPin);
    } else if (text === 'OK') {
      pin.length === 5 ? console.log('submitting pin!') : alert('Pin must be 5 numbers long😢');
    }
  };
  useEffect(() => {
    console.log(pin);
  }, [pin]);
  return (
    <div className={styles.NumberPad}>
      <div className={styles.NumberDisplay}>{pin}</div>
      <table>
        <tbody>
          <tr>
            <td onClick={handleClick}>1</td>
            <td onClick={handleClick}>2</td>
            <td onClick={handleClick}>3</td>
          </tr>
          <tr>
            <td onClick={handleClick}>4</td>
            <td onClick={handleClick}>5</td>
            <td onClick={handleClick}>6</td>
          </tr>
          <tr>
            <td onClick={handleClick}>7</td>
            <td onClick={handleClick}>8</td>
            <td onClick={handleClick}>9</td>
          </tr>
          <tr>
            <td onClick={handleClick}>←</td>
            <td onClick={handleClick}>0</td>
            <td onClick={handleClick}>OK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NumberPad;
