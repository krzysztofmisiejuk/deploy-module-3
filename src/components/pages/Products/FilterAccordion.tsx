'use client'
import { useState, useEffect, useContext } from 'react'
import { ProductContext } from '@/contexts'
import { Accordion } from '@/components'
import { AccordionCheckboxes, AccordionInputs } from './'

type FilterAccordionProps = {
	setBrand: React.Dispatch<React.SetStateAction<string[]>>
	setCategory: React.Dispatch<React.SetStateAction<string[]>>
	setMinPrice: React.Dispatch<React.SetStateAction<number | ''>>
	setMaxPrice: React.Dispatch<React.SetStateAction<number | ''>>
	setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function FilterAccordion({
	setBrand,
	setCategory,
	setMinPrice,
	setMaxPrice,
	setPage,
}: FilterAccordionProps) {
	const [selectedBrands, setSelectedBrands] = useState<string[]>(['ALL'])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([
		'ALL',
	])
	const productsList = useContext(ProductContext)
	const allBrands = Array.from(
		new Set(productsList.map((products) => products.brandName))
	)
	const allCategories = Array.from(
		new Set(productsList.map((products) => products.categoryName))
	)

	useEffect(() => {
		setBrand(selectedBrands)
		setCategory(selectedCategories)
	}, [selectedBrands, selectedCategories, setBrand, setCategory])

	return (
		<Accordion
			type='multiple'
			className='flex flex-col gap-13'
		>
			<div>
				<AccordionCheckboxes
					title='Category'
					items={allCategories}
					selectedItems={selectedCategories}
					setSelectedItems={setSelectedCategories}
					setPage={setPage}
				/>
				<AccordionCheckboxes
					title='Brand'
					items={allBrands}
					selectedItems={selectedBrands}
					setSelectedItems={setSelectedBrands}
					setPage={setPage}
				/>
				<AccordionInputs
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
				/>
			</div>
		</Accordion>
	)
}
