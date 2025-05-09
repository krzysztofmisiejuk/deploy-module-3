'use client'
import { Paragraph, CheckboxField } from '@/components'

export default function ProductProtection({
	hasProtection,
	updateProtection,
	productId,
}: {
	hasProtection: boolean
	updateProtection?: (productId: number, hasProtection: boolean) => void
	productId: number
}) {
	return (
		<div className='flex flex-col pt-4 border-t border-gray-200'>
			<div className='flex justify-between items-center'>
				<CheckboxField
					id={`protection-${productId}`}
					labelText='Product Protection'
					checked={hasProtection}
					onChange={(checked) => {
						if (updateProtection) {
							updateProtection(productId, checked)
						}
					}}
				/>
				<Paragraph
					size='lg'
					weight='medium'
				>
					$1
				</Paragraph>
			</div>
			<Paragraph
				size='sm'
				className='pl-11 text-neutral-'
			>
				The claim process is easy and instant, valid for 6 months
			</Paragraph>
		</div>
	)
}
