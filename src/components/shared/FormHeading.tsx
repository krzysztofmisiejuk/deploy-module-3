import { Heading } from '@/components'

export default function FormHeading({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='pb-5 w-full border-b border-gray-200'>
			<Heading
				Tag='h2'
				size='sm'
				weight='medium'
				className='text-neutral-900'
			>
				{children}
			</Heading>
		</div>
	)
}
