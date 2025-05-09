import {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	Input,
} from '@/components'

interface AccordionInputsProps {
	setMinPrice: React.Dispatch<React.SetStateAction<number | ''>>
	setMaxPrice: React.Dispatch<React.SetStateAction<number | ''>>
}

export default function AccordionInputs({
	setMinPrice,
	setMaxPrice,
}: AccordionInputsProps) {
	return (
		<AccordionItem value='price'>
			<AccordionTrigger className='pt-2 pb-5'>
				<h5 className='text-sm font-semibold'>Price</h5>
			</AccordionTrigger>
			<AccordionContent className='flex flex-col gap-5 pt-2 py-3'>
				<Input
					placeholder='min price'
					type='number'
					onChange={(e) =>
						setMinPrice(e.target.value ? Number(e.target.value) : '')
					}
				/>
				<Input
					placeholder='max price'
					type='number'
					onChange={(e) =>
						setMaxPrice(e.target.value ? Number(e.target.value) : '')
					}
				/>
			</AccordionContent>
		</AccordionItem>
	)
}
