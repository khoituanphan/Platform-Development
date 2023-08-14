import React from 'react';
import { useRouter } from 'next/router';
import { FileProvider } from '@/context/FileProvider';

const HomepageTest = () => {
  const router = useRouter();

  const navigateToMainPage = () => {
    router.push('/platform'); // Redirect to MainPage
  };

  return (
    <FileProvider>
      <h1>Welcome to HomepageTest!</h1>
      <button onClick={navigateToMainPage}>Go to MainPage</button>
    </FileProvider>
  );
};

export default HomepageTest;
