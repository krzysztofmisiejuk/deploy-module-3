import { Paragraph } from '@/components'

export default function CheckoutSuccessInfo({
	firstInfo,
	secondInfo,
}: {
	firstInfo: string
	secondInfo: string
}) {
	return (
		<div className='flex flex-col gap-4 border-b border-gray-200 pb-4'>
			<Paragraph size='lg'>{firstInfo}</Paragraph>
			<Paragraph className='text-neutral-600'>{secondInfo}</Paragraph>
		</div>
	)
}
