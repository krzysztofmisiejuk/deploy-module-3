import { z } from 'zod'

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)

export const registerSchema = z
	.object({
		email: z.string().email('Enter a valid email address'),
		mobileNumber: z
			.string()
			.regex(phoneRegex, 'Invalid phone number')
			.min(9, { message: 'Please enter your phone number' }),
		password: z.string().regex(passwordRegex, {
			message:
				'Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number.',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Please enter confirm password',
		}),
		country: z.string().min(2, {
			message: 'Country is required',
		}),
		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: 'You must agree to the terms.',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
