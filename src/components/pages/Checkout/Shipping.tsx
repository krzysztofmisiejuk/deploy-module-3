import { Heading, Paragraph, ShieldCross } from '@/components'

export default function Shipping() {
	return (
		<div className='flex flex-col gap-4'>
			<Heading
				Tag='h6'
				size='sm'
				weight='medium'
			>
				Shipping
			</Heading>
			<div className='flex gap-4 p-6 bg-base-dark border border-gray-200 rounded-md flex-1'>
				<ShieldCross />
				<Paragraph
					size='lg'
					weight='medium'
				>
					DevstockHub Courier
				</Paragraph>
			</div>
		</div>
	)
}
