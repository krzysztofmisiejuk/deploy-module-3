import { Heading } from '@/components'

export default function Loading() {
	return (
		<div className='flex flex-col gap-4 py-28 h-full items-center justify-center'>
			<Heading
				Tag='h2'
				className='text-neutral-900'
			>
				Loading...
			</Heading>
		</div>
	)
}
