'use client'
import { useRouter } from 'next/navigation'
import { CheckCircle, Heading, Paragraph } from '@/components'
import { useEffect } from 'react'

export default function RegisterSuccesfully() {
	const router = useRouter()

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push('/login')
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
	}, [])

	return (
		<div className='py-[70px] flex flex-col items-center justify-center text-center gap-10'>
			<CheckCircle
				width='100px'
				height='100px'
			/>
			<div className='text-neutral-900 flex flex-col gap-14'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-4'>
						<Heading
							Tag='h2'
							size='xxxl'
							weight='bold'
						>
							Thank you!
						</Heading>

						<Heading
							Tag='h3'
							size='sm'
							weight='medium'
						>
							You have succesfully register
						</Heading>
					</div>
					<div className='flex flex-col gap-[19px] text-neutral-600'>
						<Paragraph size='lg'>
							Please check your e-mail for further information. Let`s exploring
							our products and enjoy many gifts.
						</Paragraph>
						<div className='flex justify-center gap-2'>
							<Paragraph size='lg'>Having Problem?</Paragraph>
							<Paragraph
								size='lg'
								className='text-primary-300'
							>
								Contact us
							</Paragraph>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
