// pages/api/uploadModel.js
import { S3 } from 'aws-sdk';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { File } from 'buffer';
import clientPromise from '@/lib/mongoClient';
import { getFileURL } from '@/lib/utils';

const s3 = new S3({
	endpoint: process.env.DO_ORIGIN,
	credentials: {
		accessKeyId: process.env.DO_KEY,
		secretAccessKey: process.env.DO_SECRET,
	},
	forcePathStyle: false,
	region: 'sgp1',
});

async function POST(req) {
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

	const form = await req.formData();
	const user = form.get('user');

	if (user != session.user?.username) {
		return NextResponse.json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			}
		);
	}

	const file = form.get('file');
	const fileName = form.get('filename');
	const projectName = form.get('projectName');

	const isFile = file instanceof File;

	if (!fileName || !isFile) {
		return NextResponse.json(
			{
				message: 'File name and content are required',
			},
			{
				status: 400,
			}
		);
	}

	try {
		const headParams = {
			Bucket: process.env.DO_BUCKET,
			Key: fileName,
		};

		try {
			await s3.headObject(headParams).promise();
			console.log(`File ${fileName} exists, updating it...`);

			// delete the existing file
			const deleteParams = {
				Bucket: process.env.DO_BUCKET,
				Key: fileName,
			};

			await s3.deleteObject(deleteParams).promise();
			console.log(`Deleted existing file ${fileName}`);
		} catch (error) {
			if (error.code === 'NotFound') {
				console.log(`File ${fileName} does not exist, creating a new one...`);
			} else {
				throw error;
			}
		}
		const buffer = await file.arrayBuffer();

		// upload the new file with the same name
		const uploadParams = {
			Bucket: process.env.DO_BUCKET,
			Key: fileName,
			Body: Buffer.from(buffer), // Assuming fileContent is base64 encoded
			ContentType: 'model/gltf-binary', // Change to the appropriate MIME type
			ACL: 'public-read', // Adjust according to your requirements
		};

		const data = await s3.putObject(uploadParams).promise();
		console.log(`Uploaded new file ${fileName}`);

		const client = await clientPromise;
		const db = client.db();
		const projectCollection = db.collection('projects');
		projectIdentifier = user + '/' + projectName;

		const updateResult = await projectCollection.updateOne(
			{ projectIdentifier },
			{ $set: { file: getFileURL(fileName) } }
		);

		if (updateResult.modifiedCount === 1) {
			console.log(
				`Successfully updated project ${projectIdentifier} with new file ${fileName}`
			);
		} else {
			console.log(`Failed to update project ${projectIdentifier}`);
			return NextResponse.json(
				{
					message: 'Failed to update project',
				},
				{
					status: 500,
				}
			);
		}

		return NextResponse.json(
			{
				message: 'File uploaded successfully',
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error('Error handling file:', error);
		return NextResponse.json(
			{
				message: 'Internal server error',
			},
			{
				status: 500,
			}
		);
	}
}

export { POST };
