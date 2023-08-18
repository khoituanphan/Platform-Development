import React from 'react';
import { useRouter } from 'next/router';

function HomePageTest() {
	const router = useRouter();

	const navigateToAnotherPage = () => {
		// Replace '/another-page' with the actual path of the target page
		router.push('/MainPage');
	};

	return (
		<header>
			<h1>My Header</h1>
			<button onClick={navigateToAnotherPage}>Navigate to Another Page</button>
		</header>
	);
}

export default HomePageTest;
