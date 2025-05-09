import { CheckboxField } from '@/components'
import { FormField, FormItem } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { newAdressSchema } from '@/schemas/newAdressSchema'

type NewAdressData = z.infer<typeof newAdressSchema>

interface NewAddressCheckboxProps {
	form: UseFormReturn<NewAdressData>
}

export function NewAddressCheckbox({ form }: NewAddressCheckboxProps) {
	return (
		<FormField
			control={form.control}
			name='isMainAddress'
			render={({ field }) => (
				<FormItem>
					<div className='flex'>
						<CheckboxField
							id='isMainAddress'
							onChange={field.onChange}
							checked={field.value}
							labelText='Make it the main address'
						/>
					</div>
				</FormItem>
			)}
		/>
	)
}
