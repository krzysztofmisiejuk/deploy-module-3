import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { loginSchemaFirst, loginSchemaSecond } from '@/schemas/loginSchemas'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	EyeClosed,
	EyeOpen,
} from '@/components'

type LoginFormDataFirst = z.infer<typeof loginSchemaFirst>
type LoginFormDataSecond = z.infer<typeof loginSchemaSecond>
type LoginFormData = LoginFormDataFirst | LoginFormDataSecond

interface LoginInputProps {
	form: UseFormReturn<LoginFormData>
	name: 'identifier' | 'password'
	label: string
	placeholder: string
	type?: string
	showToggle?: boolean
	isVisible?: boolean
	onToggleVisibility?: () => void
}

export function LoginInput({
	form,
	name,
	label,
	placeholder,
	type = 'text',
	showToggle = false,
	isVisible = false,
	onToggleVisibility,
}: LoginInputProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<div className='relative'>
						<FormControl>
							<Input
								type={showToggle ? (isVisible ? 'text' : 'password') : type}
								placeholder={placeholder}
								{...field}
							/>
						</FormControl>
						{showToggle && (
							<button
								type='button'
								className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
								onClick={onToggleVisibility}
							>
								{isVisible ? <EyeOpen /> : <EyeClosed />}
							</button>
						)}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
