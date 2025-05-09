'use client'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components'

interface FormFieldWrapperProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	label: string
	children: React.ReactNode
	successMessage?: string
}

export default function FormFieldWrapper<T extends FieldValues>({
	control,
	name,
	label,
	children,
	successMessage,
}: FormFieldWrapperProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, formState }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>{children}</FormControl>
					<FormMessage variant={formState.errors[name] ? 'error' : 'success'}>
						{formState.errors[name]
							? String(formState.errors[name]?.message)
							: field.value && successMessage}
					</FormMessage>
				</FormItem>
			)}
		/>
	)
}
