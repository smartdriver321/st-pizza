import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import clientPromise from '@/lib/mongoConnect'
import { User } from '@/models/User'

export const authOptions = {
	secret: process.env.SECRET,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
