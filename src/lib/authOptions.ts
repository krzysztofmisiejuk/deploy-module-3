import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { getUserByEmail, getUserByMobileNumber } from '@/lib/db'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				identifier: { label: 'Email or Phone Number', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null

				const { identifier, password } = credentials as {
					identifier: string
					password: string
				}

				let user = await getUserByEmail(identifier)

				if (!user) {
					user = await getUserByMobileNumber(identifier)
				}

				if (!user) {
					return null
				}

				const isPasswordValid = await compare(password, user.passwordHash)

				if (!isPasswordValid) {
					return null
				}

				return {
					id: user.id.toString(),
					name: user.firstName,
					email: user.email,
					image: user.image,
				}
			},
		}),
	],

	pages: {
		signIn: '/login',
	},

	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.name = user.name
				token.image = user.image
			}
			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.image as string
			}
			return session
		},
	},
}
