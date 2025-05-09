'use client'
import { Button, Heading, Paragraph, Badge } from '@/components'
import { ProductInCart } from '@/types/types'

export default function PriceSummary({
	productList,
	checkout = false,
	success = false,
	onClickHandle,
}: {
	productList: ProductInCart[]
	checkout?: boolean
	success?: boolean
	onClickHandle?:
		| (() => void)
		| ((data: ProductInCart[]) => void)
		| ((data: ProductInCart[]) => Promise<void>)
}) {
	const totalPrice = productList
		.filter((product) => product.isSelected)
		.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0)

	const totalQuantity = productList
		.filter((product) => product.isSelected)
		.reduce((acc, product) => acc + (product.quantity || 1), 0)

	const protectionCost =
		productList
			.filter((product) => product.isSelected && product.hasProtection)
			.reduce((acc, product) => acc + (product.quantity || 1), 0) * 1

	const shipping = 5
	const insurance = 6
	const fees = 6

	const totalAmount =
		totalPrice + (checkout ? protectionCost + shipping + insurance + fees : 0)

	function handleClick() {
		if (onClickHandle) {
			if (checkout) {
				;(onClickHandle as (data: ProductInCart[]) => void | Promise<void>)(
					productList
				)
			} else {
				;(onClickHandle as () => void)()
			}
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-4 pb-6 border-b border-gray-200'>
				{!success && (
					<Paragraph
						size='lg'
						weight='medium'
					>
						Total Products
					</Paragraph>
				)}
				<div className='flex justify-between items-center'>
					<Paragraph
						weight='medium'
						className='text-neutral-600'
					>
						Total Product Price ({totalQuantity} items)
					</Paragraph>
					<Paragraph
						size='lg'
						weight='medium'
					>
						${totalPrice.toFixed(2)}
					</Paragraph>
				</div>
				{checkout && (
					<>
						<div className='flex justify-between items-center'>
							<Paragraph
								weight='medium'
								className='text-neutral-600'
							>
								Total Product Protection
							</Paragraph>
							<Paragraph
								size='lg'
								weight='medium'
							>
								${protectionCost.toFixed(2)}
							</Paragraph>
						</div>
						<div className='flex justify-between items-center'>
							<Paragraph
								weight='medium'
								className='text-neutral-600'
							>
								Total Shipping Price
							</Paragraph>
							<Paragraph
								size='lg'
								weight='medium'
							>
								${shipping.toFixed(2)}
							</Paragraph>
						</div>
						<div className='flex justify-between items-center'>
							<Paragraph
								weight='medium'
								className='text-neutral-600'
							>
								Shipping Insurance
							</Paragraph>
							<Paragraph
								size='lg'
								weight='medium'
							>
								${insurance.toFixed(2)}
							</Paragraph>
						</div>
					</>
				)}
			</div>
			{checkout && (
				<div className='flex flex-col gap-4 pb-6 border-b border-gray-200'>
					<Paragraph
						size='lg'
						weight='medium'
					>
						Transaction Fees
					</Paragraph>
					<div className='flex justify-between items-center'>
						<Paragraph
							weight='medium'
							className='text-neutral-600'
						>
							Service Fees
						</Paragraph>
						<Paragraph
							size='lg'
							weight='medium'
						>
							${fees.toFixed(2)}
						</Paragraph>
					</div>
				</div>
			)}
			<div className='flex flex-col gap-8'>
				<div className='flex justify-between items-center'>
					<Paragraph
						size='lg'
						weight='medium'
						className='text-neutral-600'
					>
						{checkout ? 'Grand total' : 'Subtotal'}
					</Paragraph>
					<Heading
						Tag='h5'
						size='md'
						weight='medium'
					>
						${totalAmount.toFixed(2)}
					</Heading>
				</div>
				{success && (
					<div className='flex justify-between items-center'>
						<Paragraph
							size='lg'
							weight='medium'
							className='text-neutral-600'
						>
							Status
						</Paragraph>
						<Badge variant='success'>Success</Badge>
					</div>
				)}
				<Button
					size='xl'
					className='w-full mx-auto'
					onClick={handleClick}
					disabled={totalQuantity === 0}
				>
					{checkout && !success && 'Pay Now'}
					{success && checkout && 'Continue Shopping'}
					{!success && !checkout && 'Checkout'}
				</Button>
			</div>
		</div>
	)
}
