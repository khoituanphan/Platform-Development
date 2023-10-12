// pages/api/grantAccess.js
import { grantAccessToLink } from '@/lib/mongoClient';
import clientPromise from '../../../lib/mongoClient';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { link, userEmail } = req.body;
        const { clientPromise } = await import('@/lib/mongoClient');
        const client = await connectToDatabase();
        try {
            await grantAccessToLink(client, link, userEmail);
            res.status(200).send('Access granted');
        } catch (error) {
            res.status(500).send('Error granting access');
        }
    } else {
        res.status(405).send('Method not allowed');
    }
};
