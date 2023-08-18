import React from 'react';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  const navigateToAnotherPage = () => {
    // Replace '/another-page' with the actual path of the target page
    router.push('/MainPage');
  };

  return (
    <div>
      <Head>
        {/* Other head elements if you have any */}
      </Head>
      <button onClick={navigateToAnotherPage}>Go to MainPage</button>
    </div>
  );
}

export default Header;
