import { z } from 'zod'

export const newAdressSchema = z.object({
	country: z.string().min(1, 'Country is required'),
	province: z.string().min(1, 'Province is required'),
	city: z.string().min(1, 'City is required'),
	zipCode: z.string().min(1, 'Postal code is required'),
	street: z.string().min(1, 'Address is required'),
	isMainAddress: z.boolean(),
})
