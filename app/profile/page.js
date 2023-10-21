// app/profile/page.js

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserProfile from '@/src/profile/UserProfile';
import { redirect } from 'next/dist/server/api-utils';

export default function Profile({ session }) {
    if (!session) {
        redirect('/auth');
        return <div>Please log in to view your profile.</div>;
    }

    return <UserProfile />;
}

export async function getStaticProps() {
    const session = await getServerSession(authOptions);

    return {
        props: { session },
        revalidate: 300 // Re-generate the page every 5 minutes
    };
}
