import bcrypt from 'bcrypt'
import { createAddress, createUser, getUsers } from '@/lib/db'
import { AddressType, User } from '@/types/types'

export async function POST(req: Request) {
	try {
		const users = await getUsers()
		const newUser: { data: User } = await req.json()

		const isEmailExist = users.find((user) => user.email === newUser.data.email)
		const isPhoneNumberExist = users.find(
			(user) => user.mobileNumber === newUser.data.mobileNumber
		)
		if (!newUser.data.password || !newUser.data.email) {
			return new Response(
				JSON.stringify({ error: 'Email and password are required' }),
				{ status: 400 }
			)
		}

		if (isEmailExist) {
			return new Response(
				JSON.stringify({
					error: 'An account with this e-mail address already exists',
				}),
				{ status: 409 }
			)
		}
		if (isPhoneNumberExist) {
			return new Response(
				JSON.stringify({
					error: 'An account with this phone number already exists',
				}),
				{ status: 409 }
			)
		}

		const hashedPassword = await bcrypt.hash(newUser.data.password, 10)

		const createdUser = await createUser({
			name: newUser.data.name,
			email: newUser.data.email,
			mobileNumber: newUser.data.mobileNumber,
			password: hashedPassword,
			image: 'https://i.ibb.co/8LvhXrNh/profile-Img.png',
		})

		const newUserAddress: AddressType = {
			country: newUser.data.address ?? 'unknown',
			street: 'unknown',
			city: 'unknown',
			zipCode: 'unknown',
			province: 'unknown',
		}

		await createAddress(createdUser.id, newUserAddress)

		return new Response(
			JSON.stringify({ message: `The registration was successful` }),
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error register: ', error)
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
		})
	}
}
