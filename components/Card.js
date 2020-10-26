import Link from 'next/link';
import styles from '../styles/Card.module.css';

function Card(props) {
  return (
    <Link href={props.link}>
      <div className={styles.CardContainer}>
        <h1>{props.title}</h1>
        <div>{props.description}</div>
        <div>{props.img}</div>
      </div>
    </Link>
  );
}

export default Card;
