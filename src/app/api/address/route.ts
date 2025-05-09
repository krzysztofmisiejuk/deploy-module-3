import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/authOptions'
import { createAddress, getAddresses, resetMainAddress } from '@/lib/db'
import { AddressType } from '@/types/types'

export async function GET() {
	try {
		const adresses = await getAddresses()
		if (!adresses) {
			return Response.json({ error: 'Adresses not found' }, { status: 404 })
		}
		return Response.json({ adresses }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions)
	const userId = Number(session?.user.id)

	if (!userId) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const newAddress: AddressType = await req.json()

	try {
		if (
			!newAddress.street ||
			!newAddress.city ||
			!newAddress.zipCode ||
			!newAddress.country ||
			!newAddress.province
		) {
			return Response.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		if (newAddress.isMainAddress === true) {
			await resetMainAddress(userId)
		}

		const createdAddress = await createAddress(userId, newAddress)

		revalidatePath('/checkout')

		return Response.json(
			{ newAddress: createdAddress, message: 'Address added successfully' },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
