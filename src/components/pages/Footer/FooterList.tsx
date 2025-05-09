import { Heading, Paragraph } from '@/components'
import { footerData } from '@/data/footerData'

export default function FooterList() {
	return (
		<div className='flex gap-8 justify-start md:justify-center  lg:justify-start pt-8 md:pt-0  flex-wrap w-3/5 '>
			{footerData.map((item) => {
				return (
					<div
						key={item.title}
						className='flex flex-col gap-2 md:gap-8 w-[21%] min-w-36'
					>
						<Heading
							Tag='h6'
							size='xs'
							weight='semibold'
							className='text-neutral-900'
						>
							{item.title}
						</Heading>
						<div className='flex flex-col gap-1 md:gap-4'>
							{item.elements.map((elem, index) => {
								return (
									<Paragraph
										className='text-neutral-600'
										key={index}
									>
										{elem}
									</Paragraph>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}
