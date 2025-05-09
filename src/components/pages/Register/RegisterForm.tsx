'use client'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/schemas/registerSchema'
import { User } from '@/types/types'
import { AlertContext } from '@/contexts'
import { Form, FormHeading, Button } from '@/components'
import { RegisterInput, RegisterSelect, RegisterCheckbox } from './'
import { countryOptions } from '@/data/newAdressData'

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			mobileNumber: '',
			password: '',
			confirmPassword: '',
			country: '',
			agreeToTerms: true,
		},
		mode: 'onChange',
	})

	async function register(data: User) {
		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ data }),
			})
			const newUser = await response.json()
			if (response.ok) {
				router.push('register/successfully')
				setAlert({ text: `${newUser.message}`, type: 'success' })
			} else {
				setAlert({ text: `${newUser.error}`, type: 'error' })
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	async function onSubmit(data: RegisterFormData) {
		await register({
			name: data.email.split('@')[0],
			email: data.email,
			mobileNumber: data.mobileNumber,
			password: data.password,
			address: data.country,
		})
	}

	return (
		<>
			<FormHeading>Create Account</FormHeading>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<RegisterInput
						form={form}
						name='email'
						label='Email'
						placeholder='Your Email'
						type='email'
					/>
					<RegisterInput
						form={form}
						name='mobileNumber'
						label='Mobile Number'
						placeholder='Mobile number'
						type='text'
					/>
					<RegisterInput
						form={form}
						name='password'
						label='Password'
						placeholder='Password'
						showToggle={true}
						isVisible={showPassword}
						onToggleVisibility={() => setShowPassword(!showPassword)}
					/>
					<RegisterInput
						form={form}
						name='confirmPassword'
						label='Confirm Password'
						placeholder='Confirm password'
						showToggle={true}
						isVisible={showConfirmPassword}
						onToggleVisibility={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
					/>
					<RegisterSelect
						form={form}
						name='country'
						label='Country or region'
						placeholder='Select your country'
						options={countryOptions}
					/>
					<RegisterCheckbox
						form={form}
						name='agreeToTerms'
					/>
					<Button
						type='submit'
						size='xl'
						className='w-full'
					>
						Create Account
					</Button>
				</form>
			</Form>
		</>
	)
}
