import { Heading, WarningCircle } from '@/components'

export default function NotFound() {
	return (
		<section className='flex flex-col gap-4 py-28 h-full items-center justify-center'>
			<WarningCircle
				width='50'
				height='50'
			/>
			<Heading
				Tag='h2'
				className='text-neutral-600'
			>
				Error: 404 - page not found
			</Heading>
		</section>
	)
}
