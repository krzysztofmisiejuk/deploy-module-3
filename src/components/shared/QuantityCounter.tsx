'use client'
import { Button, MinusIcon, PlusIcon } from '@/components'

type QuantityCounterProps = {
	setQuantity: (quantity: number) => void
	quantity: number
	size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export default function QuantityCounter({
	setQuantity,
	quantity,
	size = 'xxl',
}: QuantityCounterProps) {
	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	const handleIncrease = () => {
		setQuantity(quantity + 1)
	}

	return (
		<div className='flex items-center justify-evenly border border-neutral-200 w-36 rounded-md'>
			<Button
				disabled={quantity <= 1}
				variant='quantity'
				size={size}
				iconLeft={<MinusIcon />}
				onClick={handleDecrease}
			></Button>
			<span>{quantity}</span>
			<Button
				variant='quantity'
				size={size}
				iconLeft={<PlusIcon />}
				onClick={handleIncrease}
			></Button>
		</div>
	)
}
