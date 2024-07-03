import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongoClient';

async function POST(req) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({
			status: 401,
			body: { message: 'No session found' },
		});
	}

	const request = await req.json();
	const client = await clientPromise;
	const db = client.db();
	const projectCollection = db.collection('projects');

	const project = {
		name: request.projectName,
		owner: session.user.username,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	// const projectResponse = await projectCollection.insertOne(project);
}

async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({
			status: 401,
			body: { message: 'No session found' },
		});
	}
	console.log('from /api/user/new-project/route.js: ', session);
}

export { POST, GET };
