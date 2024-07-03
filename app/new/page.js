import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import NewProjectPage from '@/src/page-layouts/NewProjectPage';

const page = () => {
	const session = getServerSession(authOptions);
	// console.log(session);
	if (!session) {
		redirect('/home');
	}
	return <NewProjectPage session={session} />;
};

export default page;
