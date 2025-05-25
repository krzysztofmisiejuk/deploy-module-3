'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AlertContext, CartContext } from '@/contexts'
import { generateOrderId } from '@/lib/utils'
import { AddressType, ProductInCart } from '@/types/types'
import { Address, Shipping, PaymentMethod } from '.'
import { Heading, Paragraph, PriceSummary, ProductCart } from '@/components'
import { updateCartQuantity } from '@/lib/cartActions'

export default function Checkout({
	addresses,
	orderLength,
}: {
	addresses: AddressType[]
	orderLength: number
}) {
	const { productList, setProductList } = useContext(CartContext)!
	const router = useRouter()
	const [, setAlert] = useContext(AlertContext)

	const selectedProducts = productList.filter((product) => product.isSelected)

	function removeProductFromCart(productId: number) {
		const updatedCart = productList.filter((item) => item.id !== productId)
		setProductList(updatedCart)
	}

	function updateProtection(productId: number, hasProtection: boolean) {
		const updatedCart = productList.map((item) =>
			item.id === productId ? { ...item, hasProtection } : item
		)
		setProductList(updatedCart)
	}

	async function payNow(data: ProductInCart[]) {
		try {
			const orderNumber = await generateOrderId(orderLength)

			const response = await fetch(`/api/order`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ data, orderNumber }),
			})
			const newOrder = await response.json()
			if (response.ok) {
				router.push('/checkout/success')
			} else {
				setAlert({
					text: `${newOrder.error || 'Failed to place order'}`,
					type: 'error',
				})
			}
		} catch (error) {
			console.error('Error in payNow:', error)
			setAlert({
				text: 'Something went wrong. Please try again.',
				type: 'error',
			})
		}
	}

	return (
		<section className='flex gap-12 py-10 text-neutral-900 w-full flex-col lg:flex-row'>
			<div className='flex flex-col gap-8 flex-1 w-full'>
				<div className='flex flex-col gap-4'>
					<Heading
						Tag='h6'
						size='sm'
						weight='medium'
					>
						Your order
					</Heading>
					{selectedProducts.length === 0 ? (
						<Paragraph>Cart is empty</Paragraph>
					) : (
						selectedProducts.map((product) => (
							<ProductCart
								key={product.id}
								protection={true}
								product={product}
								removeProductFromCart={removeProductFromCart}
								updateQuantity={(productId, newQuantity) =>
									updateCartQuantity({
										productId,
										newQuantity,
										productList,
										setProductList,
									})
								}
								updateProtection={updateProtection}
							/>
						))
					)}
				</div>
				<Address addresses={addresses} />
				<Shipping />
				<PaymentMethod />
			</div>
			<div className='p-6 bg-base-dark border border-gray-200 rounded-md lg:max-w-[423px] w-full h-fit'>
				<PriceSummary
					productList={selectedProducts}
					checkout={true}
					onClickHandle={payNow}
				/>
			</div>
		</section>
	)
}
