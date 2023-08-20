import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AuthForm from '@/src/page-layouts/AuthForm';

export default async function AuthPage() {
	const session = await getServerSession(authOptions);
	if (session) {
		// console.log(session);
		redirect('/upload');
	}
	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (session) {
	// 			// If session exists, navigate to the 'homepagetest' page
	// 		} else {
	// 			setIsLoading(false);
	// 		}
	// 	});
	// }, [router]);

	return <AuthForm />;
}
