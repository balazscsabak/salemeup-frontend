import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email cím',
					type: 'email',
					placeholder: 'test@test.com',
				},
				password: { label: 'Jelszó', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const signinAttempt = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/signin/local`,
						{
							email: credentials.email,
							password: credentials.password,
						}
					);

					const { data } = signinAttempt;

					if (data) {
						return data;
					} else {
						return null;
					}
				} catch (e) {
					return null;
				}
			},
		}),
	],

	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				// token.jwt = user.token;
				// token.id = 1;
			}
			return Promise.resolve(token);
		},

		session: async ({ session, token }) => {
			if (token) {
				// session.jwt = user.jwt;
				// session.id = user.id;
			}
			return Promise.resolve(session);
		},

		async signIn({ account, profile }) {
			// if (account.provider === 'google') {
			// 	return profile.email_verified && profile.email.endsWith('@example.com');
			// }

			// console.log('called');
			// console.log('acc:', account);
			// console.log('profile:', profile);

			return true;
		},
	},

	secret: 'test',

	jwt: {
		secret: 'test',
		encryption: true,
	},
};

export default (req, res) => NextAuth(req, res, options);
