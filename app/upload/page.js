import MainPage from '@/src/page-layouts/MainPage';
import { getServerSession } from 'next-auth/next';
// import { authOptions } from './api/auth/[...nextauth]/route';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function App() {
	const session = await getServerSession(authOptions);
	// console.log(session.user?.id);
	if (!session) {
		console.log('Session not found at page: upload');
		redirect('/auth');
	}
	// console.log(session);
	return <MainPage />;
}
