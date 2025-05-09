import { z } from 'zod'

export const loginSchemaFirst = z.object({
	identifier: z
		.string()
		.min(1, { message: 'Please enter an email or username' }),
})

export const loginSchemaSecond = z.object({
	password: z.string().min(1, { message: 'Please enter a password' }),
	savePassword: z.boolean().optional(),
})
