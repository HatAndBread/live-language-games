import styles from '../styles/NumberPad.module.css';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function NumberPad({ submitPin }) {
  const [pin, setPin] = useState('');
  const pinRef = useRef(pin);

  const handleClick = (e) => {
    const text = e.target.innerText;
    if (nums.includes(text)) {
      pin.length < 5 && setPin(pin + text);
      pinRef.current = pin + text;
    } else if (text === '←') {
      const alteredPin = pin.slice(0, -1);
      setPin(alteredPin);
      pinRef.current = alteredPin;
    } else if (text === 'OK') {
      pin.length === 5 ? submitPin(pin) : alert('Pin must be 5 numbers long😢');
    }
  };
  const onKeyUp = (e) => {
    if (nums.includes(e.key) && pinRef.current.length < 5) {
      pinRef.current += e.key;
      setPin(pinRef.current);
    } else if (e.key === 'Backspace') {
      pinRef.current = pinRef.current.slice(0, -1);
      setPin(pinRef.current);
    } else if (e.key === 'Enter') {
      pinRef.current.length === 5 ? submitPin(pinRef.current) : alert('Pin must be 5 numbers long😢');
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);
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
