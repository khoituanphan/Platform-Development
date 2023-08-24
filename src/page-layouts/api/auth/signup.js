import { hashPassWord } from '@/src/lib/authenticate';
import { connectoDatabase } from '@/src/lib/db';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;
    const { email, password, username } = data;

    // Validate username
    if (!username || username.trim().length < 3) {
        res.status(422).json({ message: 'Invalid username' });
        return;
    }

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 8
    ) {
        res.status(422).json({ message: 'Sai MKhau roi khoa acc' });
        return;
    }

    const client = await connectoDatabase();
    const db = client.db();

    // Check if the username or email already exists
    const existingUser = await db.collection('user').findOne({ $or: [{ email: email }, { username: username }] });

    if (existingUser) {
        res.status(422).json({ message: 'Username or Email already taken, try something else' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassWord(password);
    const result = await db.collection('user').insertOne({
        username: username,
        email: email,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'User created' });
    client.close();
}

export default handler;
