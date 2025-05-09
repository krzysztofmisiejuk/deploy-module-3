import { Heading, Paragraph, ApplePay, Badge } from '@/components'

export default function PaymentMethod() {
	return (
		<div className='flex flex-col gap-4'>
			<Heading
				Tag='h6'
				size='sm'
				weight='medium'
			>
				Payment Method
			</Heading>
			<div className='flex gap-4 p-6 bg-base-dark border border-gray-200 rounded-md flex-1'>
				<Badge
					variant='light'
					className='h-8 flex items-center justify-center'
				>
					<div className='flex items-center justify-center'>
						<ApplePay
							width='40'
							height='32'
						/>
					</div>
				</Badge>
				<Paragraph
					size='lg'
					weight='medium'
				>
					ApplePay
				</Paragraph>
			</div>
		</div>
	)
}
