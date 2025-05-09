'use client'
import { useEffect } from 'react'
import {
	CheckboxField,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components'

interface AccordionCheckboxesProps {
	title: string
	items: string[]
	selectedItems: string[]
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
	setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function AccordionCheckboxes({
	title,
	items,
	selectedItems,
	setSelectedItems,
	setPage,
}: AccordionCheckboxesProps) {
	useEffect(() => {
		if (selectedItems.includes('ALL')) {
			setSelectedItems(['ALL'])
		}
	}, [selectedItems, setSelectedItems])

	const handleItemChange = (value: string) => {
		if (value === 'ALL') {
			setSelectedItems(['ALL'])
		} else {
			setSelectedItems((prev) =>
				prev.includes(value)
					? prev.filter((item) => item !== value)
					: [...prev.filter((item) => item !== 'ALL'), value]
			)
		}
		setPage(1)
	}

	const handleAllChange = () => {
		setSelectedItems(['ALL'])
		setPage(1)
	}

	return (
		<AccordionItem value={title.toLowerCase()}>
			<AccordionTrigger className='pt-2 pb-5'>
				<h5 className='text-sm font-semibold'>{title}</h5>
			</AccordionTrigger>
			<AccordionContent className='px-2'>
				<CheckboxField
					id={`all-${title.toLowerCase()}`}
					checked={selectedItems.length === 0 || selectedItems.includes('ALL')}
					onChange={handleAllChange}
					labelText='All'
				/>
				{items.map((item) => (
					<CheckboxField
						key={item}
						id={item}
						checked={selectedItems.includes(item)}
						onChange={() => handleItemChange(item)}
						labelText={item}
					/>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}
