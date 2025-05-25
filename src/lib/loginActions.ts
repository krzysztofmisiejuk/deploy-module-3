'use server'
import { getUserByEmail, getUserByMobileNumber } from './db'

export async function checkUser(data: { identifier: string }) {
	const emailMatches = await getUserByEmail(data.identifier)
	const usernameMatches = await getUserByMobileNumber(data.identifier)

	if (emailMatches || usernameMatches) {
		return { message: 'User founded' }
	} else {
		return { error: 'User not found' }
	}
}
