'use client'

import { useState } from 'react'

import AddressInputs from './AddressInputs'
import EditableImage from './EditableImage'

export default function UserForm({ user, onSave }) {
	const [userName, setUserName] = useState(user?.name || '')
	const [image, setImage] = useState(user?.image || '')
	const [phone, setPhone] = useState(user?.phone || '')
	const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
	const [postalCode, setPostalCode] = useState(user?.postalCode || '')
	const [city, setCity] = useState(user?.city || '')
	const [country, setCountry] = useState(user?.country || '')

	function handleAddressChange(propName, value) {
		if (propName === 'phone') setPhone(value)
		if (propName === 'streetAddress') setStreetAddress(value)
		if (propName === 'postalCode') setPostalCode(value)
		if (propName === 'city') setCity(value)
		if (propName === 'country') setCountry(value)
	}

	return (
		<div className='md:flex gap-4'>
			<div>
				<div className='p-2 rounded-lg relative max-w-[120px]'>
					<EditableImage link={image} setLink={setImage} />{' '}
				</div>
			</div>
			<form
				className='grow'
				onSubmit={(ev) =>
					onSave(ev, {
						name: userName,
						image,
						phone,
						streetAddress,
						city,
						country,
						postalCode,
					})
				}
			>
				<label>First and last name</label>
				<input
					type='text'
					placeholder='First and last name'
					value={userName}
					onChange={(ev) => setUserName(ev.target.value)}
				/>
				<label>Email</label>
				<input
					type='email'
					disabled={true}
					value={user.email}
					placeholder={'email'}
				/>
				<AddressInputs
					addressProps={{ phone, streetAddress, postalCode, city, country }}
					setAddressProp={handleAddressChange}
				/>

				<button type='submit'>Save</button>
			</form>
		</div>
	)
}
