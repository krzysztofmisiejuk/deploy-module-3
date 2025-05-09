import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { registerSchema } from '@/schemas/registerSchema'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components'

type RegisterFormData = z.infer<typeof registerSchema>

interface SelectOption {
	value: string
	label: string
}

interface RegisterSelectProps {
	form: UseFormReturn<RegisterFormData>
	name: keyof RegisterFormData
	label: string
	placeholder: string
	options: SelectOption[]
}

export default function RegisterSelect({
	form,
	name,
	label,
	placeholder,
	options,
}: RegisterSelectProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value as string}
					>
						<FormControl>
							<SelectTrigger size='lg'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage
						variant={form.formState.errors[name] ? 'error' : 'success'}
					/>
				</FormItem>
			)}
		/>
	)
}
