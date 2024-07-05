// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongoClient';
import { verifyPassword } from '@/lib/authenticate';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const client = await clientPromise;
				const db = client.db();

				const user = await db.collection('user').findOne({
					email: credentials.email,
				});

				if (!user) {
					throw new Error('Found nothing');
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					throw new Error('Invalid password');
				}

				console.log('Authenticated Successfully!');
				return {
					id: user._id.toString(),
					email: user.email,
					username: user.username, // Include the username
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			// Add the user information to the token
			if (user) {
				token.id = user.id;
				token.username = user.username; // Add username to the token
			}
			return token;
		},
		async session({ session, token }) {
			// Add the token information to the session
			if (token) {
				session.user.id = token.id;
				session.user.username = token.username; // Add username to the session
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
