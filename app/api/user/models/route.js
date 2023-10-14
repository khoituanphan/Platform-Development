// app/api/get-uploaded-model.js

import clientPromise from '@/lib/mongoClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

// export default async function handler(req, res) {
// 	const session = await getServerSession(req);
// 	if (!session) {
// 		return res.status(401).json({ message: 'Not authenticated' });
// 	}

// 	const client = await clientPromise;
// 	const db = client.db();
// 	const fileCollection = db.collection('files');

// 	const fileData = await fileCollection.findOne(
// 		{ belongsTo: session.user.email },
// 		{ sort: { createdAt: -1 } }
// 	);

// 	if (!fileData) {
// 		return res.status(404).json({ message: 'No uploaded model found' });
// 	}

// 	return res.status(200).json({ modelUrl: fileData.url });
// }

async function POST(req) {
	// try {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({
			status: 401,
			body: { message: 'No session found' },
		});
	}
	const request = await req.json();
	console.log('from /api/user/models/route.js: ', session);
	const client = await clientPromise;
	const db = client.db();
	const fileCollection = db.collection('files');

	const fileResponse = await fileCollection.findOne({
		_id: new ObjectId(request.fileID),
	});

	if (session?.user.email !== fileResponse.belongsTo) {
		return NextResponse.json({
			status: 401,
			body: { message: 'You are not authorized to view this model' },
		});
	}

	if (!fileResponse) {
		return NextResponse.json({
			status: 404,
			body: { message: 'No uploaded model found' },
		});
	}

	return NextResponse.json({
		status: 200,
		body: { modelUrl: fileResponse.url },
	});
	// } catch {
	// 	return NextResponse.json({
	// 		status: 500,
	// 		body: { message: 'Internal server error' },
	// 	});
	// }
}

export { POST };
