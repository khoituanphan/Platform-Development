//app/profile/page.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserProfile from '@/src/profile/UserProfile';
import { redirect } from 'next/navigation';

export default function ProfilePage({ session }) {
    if (!session) {
        redirect('/auth');
    }
    return <UserProfile />;
}

export async function getServerSideProps(context) {
    const session = await getServerSession(authOptions);
    return {
        props: { session }
    };
}