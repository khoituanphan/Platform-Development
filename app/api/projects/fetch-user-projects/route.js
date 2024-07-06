import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongoClient';

async function GET(req) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json(
			{
				message: 'No session found',
			},
			{
				status: 401,
			}
		);
	}

	try {
		const client = await clientPromise;
		const db = client.db();
		const projectCollection = db.collection('projects');

		const userProjects = await projectCollection
			.find({ owner: session.user.username })
			.toArray();

		return NextResponse.json(
			{
				projects: userProjects,
				message: 'success',
			},
			{
				status: 200,
			}
		);
	} catch (err) {
		return NextResponse.json(
			{
				error: err,
				message: 'Internal server error',
			},
			{
				status: 500,
			}
		);
	}
}

export { GET };
