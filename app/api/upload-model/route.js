import clientPromise from '@/lib/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { File } from 'buffer';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import { generateModifiedFilename, getFileURL } from '@/lib/utils';

const s3Client = new S3({
	endpoint: process.env.DO_ORIGIN,
	credentials: {
		accessKeyId: process.env.DO_KEY,
		secretAccessKey: process.env.DO_SECRET,
	},
	forcePathStyle: false,
	region: 'nyc3',
});

async function POST(request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		console.log("You can't upload without a session!");
		return NextResponse.json(
			{ message: 'You are not authenticated!' },
			{ status: 401 }
		);
	}

	try {
		const form = await request.formData();
		const file = form.get('file');
		// console.log(file);

		if (!file)
			return NextResponse.json(
				{ message: 'No file detected' },
				{ status: 401 }
			);

		const isFile = file instanceof File;

		if (!isFile)
			return NextResponse.json(
				{ message: 'File type not of File Type' },
				{ status: 401 }
			);

		const buffer = await file.arrayBuffer();
		const newName = generateModifiedFilename(file.name);
		const data = await s3Client.send(
			new PutObjectCommand({
				Bucket: process.env.DO_BUCKET,
				Key: newName,
				Body: Buffer.from(buffer),
			})
		);
		console.log(data);

		const client = await clientPromise;
		const db = client.db();
		const fileCollection = db.collection('files');

		const fileInsert = {
			name: file.name,
			url: getFileURL(newName),
			belongsTo: session.user.email,
			createdAt: new Date(),
		};
		const fileResponse = await fileCollection.insertOne(fileInsert);
		console.log(fileResponse);

		const insertedFileId = fileResponse.insertedId; // Get the ObjectId of the inserted file

		const userCollection = db.collection('user'); // Assuming your user collection is named 'users'

		// Update the user's files array with the new file's ObjectId
		const userUpdateResponse = await userCollection.updateOne(
			{ email: session.user.email }, // Use email to find the user
			{ $push: { files: insertedFileId } } // Use $push to append the file's ObjectId to the files array
		);

		if (userUpdateResponse.modifiedCount !== 1) {
			console.log('Failed to update user with file information.');
		}

		return NextResponse.json({ message: 'success' }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: error, message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export { POST };
