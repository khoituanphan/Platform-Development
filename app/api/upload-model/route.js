import clientPromise from '@/lib/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { File } from 'buffer';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3({
	endpoint: process.env.DO_ORIGIN,
	credentials: {
		accessKeyId: process.env.DO_KEY,
		secretAccessKey: process.env.DO_SECRET,
	},
	forcePathStyle: false,
});

async function POST(req) {
	const session = await getServerSession(authOptions);
	if (!session) {
		console.log("You can't upload without a session!");
		return NextResponse.json(
			{ message: 'You are not authenticated!' },
			{ status: 401 }
		);
	}

	// try {
	// 	const form = await req.formData();
	// 	const file = form.get('3d-model-upload');

	// 	if (!file)
	// 		return NextResponse.json(
	// 			{ message: 'No file detected' },
	// 			{ status: 401 }
	// 		);

	// 	const isFile = file instanceof File;

	// 	if (!isFile)
	// 		return NextResponse.json(
	// 			{ message: 'File type not of File Type' },
	// 			{ status: 401 }
	// 		);

	// 	const buffer = await file.arrayBuffer();
	// 	const dateCreated = new Date();
	// 	const data = await s3Client.send(
	// 		new PutObjectCommand({
	// 			Bucket: process.env.DO_BUCKET,
	// 			Key: `${file.name}-${dateCreated}`,
	// 			Body: Buffer.from(buffer),
	// 		})
	// 	);

	// 	console.log(data);
	// 	return NextResponse.json({ message: 'success' }, { status: 200 });
	// } catch (error) {
	// 	console.log(error);
	// 	return NextResponse.json(
	// 		{ error: error, message: 'Internal server error' },
	// 		{ status: 500 }
	// 	);
	//
}

export { POST };
