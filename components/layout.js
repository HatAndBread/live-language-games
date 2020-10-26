import Head from 'next/head';
import Navbar from './Navbar';

function Layout({ children, user }) {
  return (
    <div>
      <Head>
        <title>Live Language Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>{user}</div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
