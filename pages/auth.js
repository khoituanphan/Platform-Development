import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/client';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        // If session exists, navigate to the 'homepagetest' page
        router.push('Platform-Development/app/_app');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
