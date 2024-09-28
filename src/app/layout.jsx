import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'ST Pizza',
	description: 'Pizza for your wonderful life',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				{children}
				<footer className='border-t p-8 text-center text-gray-500 mt-16'>
					&copy; 2023 All rights reserved
				</footer>
			</body>
		</html>
	)
}
