import MainPage from '@/src/page-layouts/MainPage';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function App() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/auth');
	}
	return <MainPage />;
}
