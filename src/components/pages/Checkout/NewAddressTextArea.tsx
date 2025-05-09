import { Textarea } from '@/components'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { newAdressSchema } from '@/schemas/newAdressSchema'

type NewAdressData = z.infer<typeof newAdressSchema>

interface NewAddressTextareaProps {
	form: UseFormReturn<NewAdressData>
}

export function NewAddressTextarea({ form }: NewAddressTextareaProps) {
	return (
		<FormField
			control={form.control}
			name='street'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Textarea
							placeholder='Input Complete Adress (e.g Pulawska 1/3)'
							{...field}
							onChange={(e) => {
								field.onChange(e)
								form.trigger('street')
							}}
							className='h-[130px]'
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
