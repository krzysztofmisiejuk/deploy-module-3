'use client'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AlertContext } from '@/contexts'
import { generateOrderId } from '@/lib/utils'
import { loadCart, saveCart, updateCartQuantity } from '@/lib/cartActions'
import { AddressType, ProductInCart } from '@/types/types'
import { Address, Shipping, PaymentMethod } from '.'
import { Heading, Paragraph, PriceSummary, ProductCart } from '@/components'

export default function Checkout({
	addresses,
	orderLength,
}: {
	addresses: AddressType[]
	orderLength: number
}) {
	const [productsList, setProductList] = useState<ProductInCart[]>([])
	const router = useRouter()
	const [, setAlert] = useContext(AlertContext)

	useEffect(() => {
		const cart = loadCart()
		const selectedCart = cart.filter((product) => product.isSelected)
		setProductList(selectedCart)
	}, [])

	useEffect(() => {
		const handleStorageChange = () => {
			const cart = loadCart()
			const selectedCart = cart.filter((product) => product.isSelected)
			setProductList(selectedCart)
		}

		window.addEventListener('storage', handleStorageChange)
		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	function removeProductFromCart(productId: number) {
		const cart = loadCart()
		const updatedCart = cart.filter((item) => item.id !== productId)
		saveCart(updatedCart)
		setProductList(updatedCart.filter((product) => product.isSelected))
	}

	function updateProtection(productId: number, hasProtection: boolean) {
		const cart = loadCart()
		const updatedCart = cart.map((item) =>
			item.id === productId ? { ...item, hasProtection } : item
		)
		saveCart(updatedCart)
		setProductList(updatedCart.filter((product) => product.isSelected))
	}

	async function payNow(data: ProductInCart[]) {
		try {
			const orderNumber = await generateOrderId(orderLength)

			const response = await fetch('http://localhost:3000/api/order', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ data, orderNumber }),
			})
			const newOrder = await response.json()
			if (response.ok) {
				router.push('/checkout/success')
				setAlert({ text: `${newOrder.message}`, type: 'success' })
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
					{productsList.length === 0 && <Paragraph>Cart is empty</Paragraph>}
					{productsList.map((product) => (
						<ProductCart
							key={product.id}
							protection={true}
							product={product}
							removeProductFromCart={removeProductFromCart}
							updateQuantity={(productId, newQuantity) =>
								updateCartQuantity({
									productId,
									newQuantity,
									productsList: loadCart(),
									setProductList,
									setAlert,
									filterSelected: true,
								})
							}
							updateProtection={updateProtection}
						/>
					))}
				</div>
				<Address addresses={addresses} />
				<Shipping />
				<PaymentMethod />
			</div>
			<div className='p-6 bg-base-dark border border-gray-200 rounded-md lg:max-w-[423px] w-full h-fit'>
				<PriceSummary
					productList={productsList}
					checkout={true}
					onClickHandle={payNow}
				/>
			</div>
		</section>
	)
}
