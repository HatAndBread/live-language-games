import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/Layout';
import Form from '../components/Form';

import { Magic } from 'magic-sdk';

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    event.preventDefault();

    if (errorMsg) setErrorMsg('');

    console.log(e.currentTarget.email.value);
    console.log(e.currentTarget.username.value);

    const body = {
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value
    };

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email
      });
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken
        },
        body: JSON.stringify(body)
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form login={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default Login;
