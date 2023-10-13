import { connectToDatabase } from '../../lib/db';
import AWS from 'aws-sdk';

// Configure the AWS SDK for DigitalOcean Spaces
const spacesEndpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'); 
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_KEY,
    secretAccessKey: process.env.DO_SECRET
});

export default async (req, res) => {
    if (req.method === 'POST') {
        const file = req.files.file;
        const uploadParams = {
            Bucket: 'aris-models',
            Key: file.name,
            Body: file.data,
        };

        try {
            await s3.upload(uploadParams).promise();

            const { db } = await connectToDatabase();
            await db.collection('templates').insertOne({ link: file.name });

            res.json({ success: true });
        } catch (error) {
            console.error('fail upload:', error);
            res.json({ success: false, error: error.message });
        }
    } else {
        res.status(405).send('arent allow');
    }
};
