//app/auth/page.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AuthForm from '@/src/page-layouts/AuthForm';
import { useRouter } from 'next/navigation';


export default async function AuthPage() {
	const session = await getServerSession(authOptions);
	// const router = useRouter();

	if (session) {
		// console.log(session);
		redirect('/test');
		// router.push('/upload');
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
