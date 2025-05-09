'use client'
import { Input } from '@/components'

type PriceInputsProps = {
	minPrice: number | ''
	maxPrice: number | ''
	onMinChange: (value: number | '') => void
	onMaxChange: (value: number | '') => void
}

export default function PriceInputs({
	minPrice,
	maxPrice,
	onMinChange,
	onMaxChange,
}: PriceInputsProps) {
	return (
		<div className='flex flex-col gap-5 pt-2 py-3'>
			<Input
				type='number'
				placeholder='min price'
				value={minPrice}
				onChange={(e) =>
					onMinChange(e.target.value ? Number(e.target.value) : '')
				}
			/>
			<Input
				type='number'
				placeholder='max price'
				value={maxPrice}
				onChange={(e) =>
					onMaxChange(e.target.value ? Number(e.target.value) : '')
				}
			/>
		</div>
	)
}
