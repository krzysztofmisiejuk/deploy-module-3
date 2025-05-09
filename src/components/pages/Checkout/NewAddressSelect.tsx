import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { newAdressSchema } from '@/schemas/newAdressSchema'
import { NewAddessData } from '@/types/types'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components'

type NewAdressData = z.infer<typeof newAdressSchema>

interface NewAddressSelectProps {
	form: UseFormReturn<NewAdressData>
	name: keyof NewAdressData
	placeholder: string
	options: NewAddessData[]
}

export function NewAddressSelect({
	form,
	name,
	placeholder,
	options,
}: NewAddressSelectProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='w-full sm:max-w-[400px] mx-auto'>
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
