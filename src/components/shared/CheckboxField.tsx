'use client'
import { CheckboxFieldProps } from '@/types/types'
import { Paragraph, Label, Checkbox } from '@/components'

export default function CheckboxField({
	id,
	checked,
	onChange,
	labelText,
}: CheckboxFieldProps) {
	return (
		<div className='flex items-center gap-5 pt-2 py-3'>
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={onChange}
			/>
			<Label htmlFor={id}>
				<Paragraph>{labelText}</Paragraph>
			</Label>
		</div>
	)
}
