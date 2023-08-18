import NextAuth from 'next-auth';
// import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/client';
import { verifyPassword } from '@/lib/authenticate';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const client = await clientPromise;

				const usersCollection = client.db().collection('user');

				const users = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!users) {
					client.close();
					throw new Error('Found nothing');
				}

				const isValid = await verifyPassword(
					credentials.password,
					users.password
				);

				if (!isValid) {
					client.close();
					throw new Error('Cust');
				}
				client.close();
				return { email: users.email };
			},
		}),
	],
	session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
