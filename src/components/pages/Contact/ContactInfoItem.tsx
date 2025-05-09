import { Heading, Paragraph } from '@/components/shared'
import { ContactDataType } from '@/types/types'

export default function ContactInfoItem({ data }: { data: ContactDataType }) {
	return (
		<div className='space-y-4'>
			<div className='flex gap-4 items-center'>
				<Heading
					Tag='h5'
					weight='medium'
					size='sm'
					className='text-neutral-900'
				>
					{data.title}
				</Heading>
				{data.icons.map((icon) => icon)}
			</div>
			<Paragraph
				size='lg'
				className='text-neutral-500'
			>
				{data.description}
			</Paragraph>
			<Paragraph
				size='lg'
				className='text-primary-500'
			>
				{data.link}
			</Paragraph>
		</div>
	)
}
