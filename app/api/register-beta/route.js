// app/api/get-uploaded-model.js

import clientPromise from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

async function POST(req) {
	try {
		const request = await req.json();
		const client = await clientPromise;
		const db = client.db();
		const betaCollection = db.collection('betas');

		const fileResponse = await betaCollection.insertOne({
			email: request.email,
		});

		return NextResponse.json({
			status: 200,
			body: { message: 'User added to beta list.' },
		});
	} catch {
		return NextResponse.json({
			status: 500,
			body: { message: 'Internal server error' },
		});
	}
}

export { POST };
