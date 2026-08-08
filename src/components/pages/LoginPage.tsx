import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import SignIn from '@/components/SignIn';

const APP_SIGN_IN = 'https://app.elystra.online/sign-in';

/**
 * /login — branded navigational landing for "Elystra login" queries.
 * Renders sign-in UI; also sets meta for Google entity resolution.
 */
const LoginPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect') === 'app') {
      window.location.replace(APP_SIGN_IN);
    }
  }, []);

  return (
    <>
      <SeoHead
        title="Login | Elystra"
        description="Log in to Elystra — access your agency dashboard, proposals, deal intelligence, and client portal at app.elystra.online."
        path="/login"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Login', path: '/login' },
        ]}
      />
      <SignIn />
      <noscript>
        <p style={{ textAlign: 'center', padding: '2rem' }}>
          <Link to="/">Elystra</Link> —{' '}
          <a href={APP_SIGN_IN}>Continue to app login</a>
        </p>
      </noscript>
    </>
  );
};

export default LoginPage;
