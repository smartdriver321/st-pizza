import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import clientPromise from '@/lib/mongoConnect'
import { User } from '@/models/User'
import { UserInfo } from '@/models/UserInfo'

export const authOptions = {
	secret: process.env.SECRET,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			id: 'credentials',
			credentials: {
				username: {
					label: 'Email',
					type: 'email',
					placeholder: 'test@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			// eslint-disable-next-line no-unused-vars
			async authorize(credentials, req) {
				mongoose.connect(process.env.MONGO_URL)

				const email = credentials?.email
				const password = credentials?.password

				const user = await User.findOne({ email })
				const passwordOk = user && bcrypt.compareSync(password, user.password)

				if (passwordOk) {
					return user
				}

				return null
			},
		}),
	],
}

export async function isAdmin() {
	const session = await getServerSession(authOptions)
	const userEmail = session?.user?.email

	if (!userEmail) {
		return false
	}

	const userInfo = await UserInfo.findOne({ email: userEmail })

	if (!userInfo) {
		return false
	}
	return userInfo.admin
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
