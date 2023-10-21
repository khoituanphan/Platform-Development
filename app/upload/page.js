// app/upload/page.js
import UploadPage from '@/src/page-layouts/UploadPage';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default function App() {
	return <UploadPage />;
}

export async function getServerSideProps(context) {
	const session = await getServerSession(authOptions, context.req);

	if (!session) {
		console.log('Session not found at page: upload');
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	// If session exists, continue rendering the page
	return {
		props: {}, // Return an empty props object since we don't need to pass anything to the component
	};
}
