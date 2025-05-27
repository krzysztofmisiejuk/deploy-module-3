import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { newAdressSchema } from '@/schemas/newAdressSchema'
import {
	Input,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components'

type NewAdressData = z.infer<typeof newAdressSchema>

type InputFieldName = Exclude<keyof NewAdressData, 'isMainAddress'>

interface NewAddressInputProps {
	form: UseFormReturn<NewAdressData>
	name: InputFieldName
	placeholder: string
}

export function NewAddressInput({
	form,
	name,
	placeholder,
}: NewAddressInputProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='w-full sm:max-w-[400px] mx-auto'>
					<FormControl>
						<Input
							type={name === 'zipCode' ? 'number' : 'text'}
							placeholder={placeholder}
							{...field}
							value={name === 'zipCode' ? field.value ?? '' : field.value}
							onChange={(e) => {
								if (name === 'zipCode') {
									const value = e.target.value
									field.onChange(value === '' ? "" : Number(value))
								} else {
									field.onChange(e.target.value)
								}
							}}
						/>
					</FormControl>
					<FormMessage
						variant={form.formState.errors[name] ? 'error' : 'success'}
					/>
				</FormItem>
			)}
		/>
	)
}
