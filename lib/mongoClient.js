import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
		// console.log('Connected to MongoDB...');
	}

	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

const dbName = 'aris-platform'; 
const collectionName = 'access-right'; 

async function grantAccessToLink(client, link, userEmail) {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingLink = await collection.findOne({ link, userEmail });
    if (existingLink) {
        throw new Error('Link already exists for this user');
    }

    // Insert the new link for the user
    await collection.insertOne({ link, userEmail });
}

async function checkAccess(client, link, userEmail) {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const doc = await collection.findOne({ link });
    if (!doc) return false; 

    return doc.usersWithAccess.includes(userEmail);
}

export { grantAccessToLink, checkAccess };
