'use client'
import { useRouter } from 'next/navigation'
import { Button, Heading, Paragraph, ArrowRight } from '@/components'

export default function ContactUs() {
	const router = useRouter()
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-y-10 px-10 md:px-30 xl:px-30 py-10 min-h-[465px] w-full bg-gray-50 border-gray-200 rounded-md text-neutral-600'>
			<div className='flex flex-col gap-10 max-w-[462px]'>
				<div className='flex flex-col gap-6'>
					<Heading
						weight='medium'
						Tag='h4'
						className='text-neutral-900'
					>
						Contact Us
					</Heading>
					<Paragraph>
						If you have any questions or require additional information, we
						encourage you to contact us. We are ready to assist in answering
						your inquiries
					</Paragraph>
				</div>
				<div>
					<Button
						size='xl'
						variant='strokePagination'
						iconRight={<ArrowRight fill='#fcfcfc' />}
						onClick={() => {
							router.push('/contact/chat')
						}}
					>
						Chat with AI Advisor
					</Button>
				</div>
			</div>
			<div className='flex justify-center h-full max-w-[600px] w-full'>
				<img
					src='https://i.ibb.co/vxzBJvDj/Image.png'
					alt='contact-img'
					className='w-full'
				/>
			</div>
		</div>
	)
}
