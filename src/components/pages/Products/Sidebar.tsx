'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import {
	Heading,
	CheckboxField,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Input,
} from '@/components'
import { Product } from '@/types/types'

export default function Sidebar({
	products,
	minAvailablePrice,
}: {
	products: Product[]
	minAvailablePrice: number
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const selectedBrands = searchParams.getAll('brand')
	const selectedCategories = searchParams.getAll('category')
	const initialMinPrice = searchParams.get('minPrice') || ''
	const initialMaxPrice = searchParams.get('maxPrice') || ''
	const [minPrice, setMinPrice] = useState(initialMinPrice)
	const [maxPrice, setMaxPrice] = useState(initialMaxPrice)

	const allBrands = Array.from(
		new Set(products.map((product) => product.brandName))
	).sort()

	const allCategories = Array.from(
		new Set(products.map((product) => product.categoryName))
	).sort()

	const defaultAccordionValues = []
	if (selectedBrands.length > 0) {
		defaultAccordionValues.push('brand')
	}
	if (selectedCategories.length > 0) {
		defaultAccordionValues.push('category')
	}
	if (minPrice || maxPrice) {
		defaultAccordionValues.push('price')
	}

	const debouncedUpdatePriceFilters = useDebouncedCallback(() => {
		const params = new URLSearchParams()

		selectedBrands.forEach((brand) => params.append('brand', brand))
		selectedCategories.forEach((category) =>
			params.append('category', category)
		)
		if (minPrice) params.set('minPrice', minPrice)
		if (maxPrice) params.set('maxPrice', maxPrice)

		const currentOrder = searchParams.get('order') || 'lat'
		const currentPage = searchParams.get('page') || '1'
		const currentLimit = searchParams.get('limit') || '9'

		params.set('order', currentOrder)
		params.set('page', currentPage)
		params.set('limit', currentLimit)

		router.push(`/product?${params.toString()}`, { scroll: false })
	}, 300)

	return (
		<div className='flex flex-col mx-auto gap-13 py-10 pr-10 min-w-[260px] max-w-[360px] w-1/4 border-gray-200'>
			<Accordion
				type='multiple'
				className='flex flex-col gap-4'
				defaultValue={defaultAccordionValues}
			>
				<AccordionItem value='brand'>
					<AccordionTrigger className='pt-2 pb-5'>
						<Heading
							Tag='h5'
							size='xs'
							weight='semibold'
						>
							Brand
						</Heading>
					</AccordionTrigger>
					<AccordionContent className='px-2'>
						{allBrands.map((brand) => (
							<CheckboxField
								key={brand}
								id={brand}
								checked={selectedBrands.includes(brand)}
								onChange={() => {
									const updatedBrand = selectedBrands.includes(brand)
										? selectedBrands.filter((b) => b !== brand)
										: [...selectedBrands, brand]
									const params = new URLSearchParams()

									updatedBrand.forEach((b) => params.append('brand', b))
									selectedCategories.forEach((category) =>
										params.append('category', category)
									)
									if (minPrice) params.set('minPrice', minPrice)
									if (maxPrice) params.set('maxPrice', maxPrice)

									router.push(`/product?${params.toString()}`, {
										scroll: false,
									})
								}}
								labelText={brand}
							/>
						))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='category'>
					<AccordionTrigger className='pt-2 pb-5'>
						<Heading
							Tag='h5'
							size='xs'
							weight='semibold'
						>
							Category
						</Heading>
					</AccordionTrigger>
					<AccordionContent className='px-2'>
						{allCategories.map((cat) => (
							<CheckboxField
								key={cat}
								id={cat}
								checked={selectedCategories.includes(cat)}
								onChange={() => {
									const updatedCat = selectedCategories.includes(cat)
										? selectedCategories.filter((c) => c !== cat)
										: [...selectedCategories, cat]
									const params = new URLSearchParams()

									selectedBrands.forEach((brand) =>
										params.append('brand', brand)
									)
									updatedCat.forEach((category) =>
										params.append('category', category)
									)
									if (minPrice) params.set('minPrice', minPrice)
									if (maxPrice) params.set('maxPrice', maxPrice)

									router.push(`/product?${params.toString()}`, {
										scroll: false,
									})
								}}
								labelText={cat}
							/>
						))}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='price'>
					<AccordionTrigger className='pt-2 pb-5'>
						<Heading
							Tag='h5'
							size='xs'
							weight='semibold'
						>
							Price
						</Heading>
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-5 pt-2 py-3'>
						<Input
							placeholder={`Min ${minAvailablePrice}`}
							type='number'
							value={minPrice}
							min={minAvailablePrice}
							title={`Minimalna cena: ${minAvailablePrice}`}
							onChange={(e) => {
								setMinPrice(e.target.value)
								debouncedUpdatePriceFilters()
							}}
						/>
						<Input
							placeholder='max price'
							type='number'
							value={maxPrice}
							onChange={(e) => {
								setMaxPrice(e.target.value)
								debouncedUpdatePriceFilters()
							}}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
