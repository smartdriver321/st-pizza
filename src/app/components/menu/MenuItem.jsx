import Image from 'next/image'
import { useState } from 'react'
import FlyingButton from 'react-flying-item'

export default function MenuItem(menuItem) {
	const { image, name, description, basePrice, sizes, extraIngredientPrices } =
		menuItem

	const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
	const [selectedExtras, setSelectedExtras] = useState([])
	const [showPopup, setShowPopup] = useState(false)

	return (
		<>
			{showPopup && (
				<div
					className='fixed inset-0 bg-black/80 flex items-center justify-center'
					onClick={() => setShowPopup(false)}
				>
					<div
						className='my-8 bg-white p-2 rounded-lg max-w-md'
						onClick={(ev) => ev.stopPropagation()}
					>
						<div
							className='overflow-y-scroll p-2'
							style={{ maxHeight: 'calc(100vh - 100px)' }}
						>
							<Image
								src={image}
								alt={name}
								width={300}
								height={200}
								className='mx-auto'
							/>
							<h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
							<p className='text-center text-gray-500 text-sm mb-2'>
								{description}
							</p>
							{sizes?.length > 0 && (
								<div className='py-2'>
									<h3 className='text-center text-gray-700'>Pick your size</h3>
									{sizes.map((size) => (
										<label
											key={size._id}
											className='flex items-center gap-2 p-4 border rounded-md mb-1'
										>
											<input
												type='radio'
												onChange={() => setSelectedSize(size)}
												checked={selectedSize?.name === size.name}
												name='size'
											/>
											{size.name} ${basePrice + size.price}
										</label>
									))}
								</div>
							)}
							{extraIngredientPrices?.length > 0 && (
								<div className='py-2'>
									<h3 className='text-center text-gray-700'>Any extras?</h3>
									{extraIngredientPrices.map((extraThing) => (
										<label
											key={extraThing._id}
											className='flex items-center gap-2 p-4 border rounded-md mb-1'
										>
											<input
												type='checkbox'
												checked={selectedExtras
													.map((e) => e._id)
													.includes(extraThing._id)}
												name={extraThing.name}
												onChange={() => {}}
											/>
											{extraThing.name} +${extraThing.price}
										</label>
									))}
								</div>
							)}
							<FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
								<div className='primary sticky bottom-2' onClick={() => {}}>
									Add to cart $123
								</div>
							</FlyingButton>
							<button className='mt-2' onClick={() => setShowPopup(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
