import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { registerSchema } from '@/schemas/registerSchema'
import { CheckboxField, FormField, FormItem, FormMessage } from '@/components'

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterCheckboxProps {
	form: UseFormReturn<RegisterFormData>
	name: keyof RegisterFormData
}

export default function RegisterCheckbox({
	form,
	name,
}: RegisterCheckboxProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className='flex items-center gap-4 pt-2'>
						<CheckboxField
							id='agreeTerms'
							onChange={field.onChange}
							defaultChecked={true}
							labelText={
								<span className='text-neutral-900 text-sm'>
									By creating an account and check, you agree to the
									<span className='text-primary-500'> Conditions of Use </span>
									and
									<span className='text-primary-500'> Privacy Notice</span>.
								</span>
							}
						/>
					</div>
					<FormMessage
						variant={form.formState.errors[name] ? 'error' : 'success'}
					>
						{form.formState.errors[name]?.message}
					</FormMessage>
				</FormItem>
			)}
		/>
	)
}
