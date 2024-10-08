import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import { AppProvider } from '@/providers/AppContext'
import Header from '@/components/layout/Header'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export const metadata = {
	title: 'ST Pizza',
	description: 'Pizza for your wonderful life',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body className={roboto.className}>
				<main className='max-w-4xl mx-auto p-4'>
					<AppProvider>
						<Toaster />
						<Header />
						{children}
						<footer className='border-t p-8 text-center text-gray-500 mt-16'>
							&copy; 2023 All rights reserved
						</footer>
					</AppProvider>
				</main>
			</body>
		</html>
	)
}
