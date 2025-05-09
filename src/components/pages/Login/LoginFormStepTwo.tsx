'use client'
import { useContext, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertContext } from '@/contexts/AlertContext'
import { loginSchemaSecond } from '@/schemas/loginSchemas'
import {
	Button,
	Paragraph,
	EyeOpen,
	EyeClosed,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Checkbox,
	Input,
	Label,
} from '@/components'

export default function LoginFormStepTwo() {
	const [showPassword, setShowPassword] = useState(false)
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()
	const searchParams = useSearchParams()
	const identifier = searchParams.get('identifier')

	type FormData = z.infer<typeof loginSchemaSecond>

	const form = useForm<FormData>({
		resolver: zodResolver(loginSchemaSecond),
		defaultValues: {
			password: '',
			savePassword: true,
		},
	})

	const onSubmit = async (data: FormData) => {
		if (!identifier) {
			return
		}

		const res = await signIn('credentials', {
			identifier: identifier,
			password: data.password,
			redirect: false,
		})

		if (res?.ok) {
			setAlert({ text: 'Login succesfully', type: 'success' })
			router.push('/')
			router.refresh()
			return
		}
		setAlert({ text: 'Wrong password', type: 'error' })
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-8'
			>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<div className='relative'>
								<FormControl>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='Password'
										{...field}
									/>
								</FormControl>
								<button
									type='button'
									className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOpen /> : <EyeClosed />}
								</button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='savePassword'
					render={({ field }) => (
						<FormItem>
							<div className='flex items-center justify-between gap-4'>
								<div className='flex gap-3'>
									<Checkbox
										id='savePassword'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<Label
										htmlFor='savePassword'
										className='text-neutral-600 text-base'
									>
										Save Password
									</Label>
								</div>
								<Paragraph
									size='md'
									weight='regular'
									className='text-neutral-900'
								>
									Forgot your password?
								</Paragraph>
							</div>
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
						Sign In
					</Button>
				</div>
			</form>
		</Form>
	)
}
