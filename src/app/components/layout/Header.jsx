'use client'

import Link from 'next/link'
import { useState } from 'react'

import Bars2 from '../icons/Bars2'
import ShoppingCart from '../icons/ShoppingCart'

export default function Header() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false)

	return (
		<header>
			<div className='flex items-center md:hidden justify-between'>
				<Link className='text-primary font-semibold text-2xl' href={'/'}>
					ST PIZZA
				</Link>
				<div className='flex gap-8 items-center'>
					<Link href={'/cart'} className='relative'>
						<ShoppingCart />
					</Link>
					<button
						className='p-1 border'
						onClick={() => setMobileNavOpen((prev) => !prev)}
					>
						<Bars2 />
					</button>
				</div>
			</div>
			{mobileNavOpen && (
				<div
					onClick={() => setMobileNavOpen(false)}
					className='md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'
				>
					<Link href={'/'}>Home</Link>
					<Link href={'/menu'}>Menu</Link>
					<Link href={'/#about'}>About</Link>
					<Link href={'/#contact'}>Contact</Link>
				</div>
			)}
			<div className='hidden md:flex items-center justify-between'>
				<nav className='flex items-center gap-8 text-gray-500 font-semibold'>
					<Link className='text-primary font-semibold text-2xl' href={'/'}>
						ST PIZZA
					</Link>
					<Link href={'/'}>Home</Link>
					<Link href={'/menu'}>Menu</Link>
					<Link href={'/#about'}>About</Link>
					<Link href={'/#contact'}>Contact</Link>
				</nav>
				<nav className='flex items-center gap-4 text-gray-500 font-semibold'>
					<Link href={'/cart'} className='relative'>
						<ShoppingCart />
					</Link>
				</nav>
			</div>
		</header>
	)
}
