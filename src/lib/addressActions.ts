'use server'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/authOptions'
import { createAddress, resetMainAddress } from '@/lib/db'
import { AddressType } from '@/types/types'

export async function createNewAddress(newAddress: AddressType) {
	const session = await getServerSession(authOptions)
	const userId = Number(session?.user.id)

	if (!userId) {
		return { error: 'Unauthorized', status: 401 }
	}

	if (
		!newAddress.street ||
		!newAddress.city ||
		!newAddress.zipCode ||
		!newAddress.country ||
		!newAddress.province
	) {
		return { error: 'Missing required fields', status: 400 }
	}

	if (newAddress.isMainAddress === true) {
		await resetMainAddress(userId)
	}

	const createdAddress = await createAddress(userId, newAddress)

	revalidatePath('/checkout')

	return {
		newAddress: createdAddress,
		message: 'Address added successfully',
		status: 201,
	}
}
