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
    </div>
  );
}

export default Layout;
