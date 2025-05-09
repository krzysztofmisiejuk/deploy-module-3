'use client'
import { useContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AlertContext } from '@/contexts/AlertContext'
import { loginSchemaFirst } from '@/schemas/loginSchemas'
import {
	Button,
	Paragraph,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components'

export default function LoginFormStepOne() {
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	type FormData = z.infer<typeof loginSchemaFirst>

	const form = useForm<FormData>({
		resolver: zodResolver(loginSchemaFirst),
		defaultValues: {
			identifier: '',
		},
	})

	async function checkUser(data: { identifier: string }) {
		try {
			const response = await fetch('/api/users/check', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-internal-api-call': 'true',
				},
				body: JSON.stringify({ identifier: data.identifier }),
			})

			const res = await response.json()
			if (response.ok) {
				setAlert({ text: `${res.message}`, type: 'success' })
				router.push(
					`/login/step-2?identifier=${encodeURIComponent(data.identifier)}`
				)
			} else {
				setAlert({ text: `${res.error}`, type: 'error' })
			}
		} catch (error) {
			console.error('Error checking user:', error)
		}
	}

	const onSubmit = async (data: FormData) => {
		await checkUser(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-8'
			>
				<FormField
					control={form.control}
					name='identifier'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email or mobile phone number</FormLabel>
							<FormControl>
								<Input
									placeholder='Email or mobile phone number'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col gap-6'>
					<Button
						type='submit'
						size='xl'
						className='w-full'
					>
						Continue
					</Button>
					<Paragraph
						size='sm'
						className='text-neutral-600'
					>
						Don`t have an account?{' '}
						<Link
							href='/register'
							className='font-semibold'
						>
							Register
						</Link>
					</Paragraph>
				</div>
			</form>
		</Form>
	)
}
