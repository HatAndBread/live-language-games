import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { Magic } from 'magic-sdk';

function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY).auth.loginWithMagicLink({ email: email });
    console.log(did);

    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
      body: JSON.stringify({ email: email })
    };
    const raw = await fetch('/api/login', options);
    const res = await raw.json();
    console.log(res);
    router.push('/');
  };
  return (
    <Layout>
      <div className={styles.LoginMain}>
        <div>
          <form onSubmit={handleSubmit}>
            <label id="email" htmlFor="email">
              Email:{' '}
            </label>
            <input name="email" onChange={handleChange}></input>
            <button>Submit</button>
          </form>
        </div>
      </div>
      <footer className={styles.footer}>
        <img src="/fb.png" width="50px"></img>
      </footer>
    </Layout>
  );
}

export default Login;
