import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

function Layout({ children, user }) {
  return (
    <div>
      <Head>
        <title>Live Language Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>{user}</div>
      <div className={styles.LayoutMain}>{children}</div>
      <footer className={styles.footer}>
        <img src="/fb.png" width="50px"></img>
      </footer>
    </div>
  );
}

export default Layout;
