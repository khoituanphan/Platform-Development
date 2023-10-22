//app/profile/page.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserProfile from '@/src/profile/UserProfile';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
	const session = getServerSession(authOptions);
	if (!session) {
		redirect('/auth');
	}
	return <UserProfile />;
}
