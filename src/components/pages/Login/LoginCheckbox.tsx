import { Checkbox, Paragraph, Label } from '@/components'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { loginSchemaSecond } from '@/schemas/loginSchemas'

type LoginFormDataSecond = z.infer<typeof loginSchemaSecond>

interface LoginCheckboxProps {
	form: UseFormReturn<LoginFormDataSecond>
	name: 'savePassword'
}

export function LoginCheckbox({ form, name }: LoginCheckboxProps) {
	return (
		<FormField
			control={form.control}
			name={name}
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
	)
}
