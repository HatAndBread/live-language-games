import { useUser } from '../lib/hooks';
import Layout from '../components/Layout';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import gameDescriptions from '../logic/GameDescriptions';

const Home = () => {
  const user = useUser();
  console.log(user);
  const games = gameDescriptions.map((game) => {
    return <Card key={game.title} title={game.title} description={game.description} img={game.img} link={game.link} />;
  });

  return (
    <Layout>
      <main>
        <div>Welcome to Live Language Games!</div>
        <div className={styles.cardContainer}>
          <ul className={styles.cardsList}>{games}</ul>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
