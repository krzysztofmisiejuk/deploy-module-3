'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clearCart } from '@/lib/cartActions'
import { OrderType } from '@/types/types'
import {
	CheckCircle,
	CheckoutSuccessInfo,
	Heading,
	OrderedProduct,
	Paragraph,
	PriceSummary,
} from '@/components'

export default function CheckoutSuccess({
	lastOrder,
}: {
	lastOrder: OrderType
}) {
	const router = useRouter()

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleClearCart()
		}, 3000)

		return () => clearTimeout(timeout)
	}, [])

	function handleClearCart() {
		clearCart()
		router.push('/')
	}

	return (
		<section className='flex items-center justify-center pt-10 pb-20 xl:px-10 text-neutral-900'>
			<div className='flex flex-col items-center gap-6 p-6 border border-gray-200 bg-base-dark rounded-md max-w-[640px] w-full'>
				<div className='flex flex-col gap-6 items-center'>
					<CheckCircle
						width='80'
						height='80'
					/>
					<Heading
						Tag='h5'
						weight='medium'
						size='md'
					>
						Thanks for Your Order!
					</Heading>
				</div>
				<Paragraph className='neutral-600'>
					Order number: {lastOrder.orderNumber}
				</Paragraph>
				<div className='flex flex-col gap-4 w-full'>
					<CheckoutSuccessInfo
						firstInfo='Transaction Date'
						secondInfo={new Date(lastOrder.createdAt).toDateString()}
					/>
					<CheckoutSuccessInfo
						firstInfo='Payment method'
						secondInfo='ApplePay'
					/>
					<CheckoutSuccessInfo
						firstInfo='Shipping method'
						secondInfo='DevstockHub Courier'
					/>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<Paragraph size='lg'>Your Order</Paragraph>
					{lastOrder.products.length === 0 ? (
						<Paragraph>No products in order</Paragraph>
					) : (
						lastOrder.products.map((product) => (
							<OrderedProduct
								key={product.id}
								product={product}
							/>
						))
					)}
					<div>
						<PriceSummary
							productList={lastOrder.products}
							checkout={true}
							success={true}
							onClickHandle={handleClearCart}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
