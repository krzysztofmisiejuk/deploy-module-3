import { z } from 'zod'

export const newAdressSchema = z.object({
	country: z.string().min(1, 'Country is required'),
	province: z.string().min(1, 'Province is required'),
	city: z.string().min(1, 'City is required'),
	zipCode: z
		.number({ required_error: 'Postal code is required' })
		.int('Postal code must be an integer')
		.min(0o0, 'Postal code must be exactly 5 digits')
		.max(99999, 'Postal code must be exactly 5 digits'),
	street: z.string().min(1, 'Address is required'),
	isMainAddress: z.boolean(),
})
