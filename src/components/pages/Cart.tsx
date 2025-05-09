'use client'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { ProductInCart } from '@/types/types'
import { loadCart, saveCart, updateCartQuantity } from '@/lib/cartActions'
import { AlertContext } from '@/contexts'
import {
	CheckboxField,
	Paragraph,
	PriceSummary,
	ProductCart,
} from '@/components'

export default function Cart() {
	const [productsList, setProductList] = useState<ProductInCart[]>([])
	const [isSelectAll, setIsSelectAll] = useState<boolean>(true)
	const router = useRouter()
	const [, setAlert] = useContext(AlertContext)

	useEffect(() => {
		const cart = loadCart()
		setProductList(cart)
		setIsSelectAll(
			cart.length > 0 && cart.every((product) => product.isSelected)
		)
	}, [])

	useEffect(() => {
		function handleStorageChange() {
			const cart = loadCart()
			setProductList(cart)
			setIsSelectAll(
				cart.length > 0 && cart.every((product) => product.isSelected)
			)
		}

		window.addEventListener('storage', handleStorageChange)
		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	function removeProductFromCart(productId: number) {
		const updatedCart = productsList.filter((item) => item.id !== productId)
		saveCart(updatedCart)
		setProductList(updatedCart)
		setIsSelectAll(
			updatedCart.length > 0 &&
				updatedCart.every((product) => product.isSelected)
		)
	}

	function handleSelectAllChange(checked: boolean) {
		setIsSelectAll(checked)
		const updatedCart = productsList.map((product) => ({
			...product,
			isSelected: checked,
		}))
		saveCart(updatedCart)
		setProductList(updatedCart)
	}

	const handleProductCheckboxChange = (productId: number, checked: boolean) => {
		const updatedCart = productsList.map((product) =>
			product.id === productId ? { ...product, isSelected: checked } : product
		)
		saveCart(updatedCart)
		setProductList(updatedCart)
		setIsSelectAll(updatedCart.every((product) => product.isSelected))
	}

	function goToCheckout() {
		router.push('/checkout')
	}

	return (
		<section className='flex justify-center gap-12 py-10 text-neutral-900 w-full flex-col lg:flex-row'>
			<div className='flex flex-col gap-8 flex-1 w-full'>
				{productsList.length === 0 && <Paragraph>Cart is empty</Paragraph>}
				{productsList.length > 0 && (
					<>
						<CheckboxField
							id='select-all'
							checked={isSelectAll}
							onChange={handleSelectAllChange}
							labelText='Select All'
						/>
						{productsList.map((product) => (
							<div
								key={product.id}
								className='flex flex-col md:flex-row gap-6 w-full items-center'
							>
								<Checkbox
									checked={product.isSelected}
									onCheckedChange={(checked) =>
										handleProductCheckboxChange(product.id, checked as boolean)
									}
								/>
								<ProductCart
									product={product}
									protection={false}
									removeProductFromCart={removeProductFromCart}
									updateQuantity={(productId, newQuantity) =>
										updateCartQuantity({
											productId,
											newQuantity,
											productsList,
											setProductList,
											setAlert,
										})
									}
								/>
							</div>
						))}
					</>
				)}
			</div>
			<div className='p-6 bg-base-dark border border-gray-200 rounded-md lg:max-w-[423px] w-full h-fit'>
				<PriceSummary
					productList={productsList}
					checkout={false}
					onClickHandle={goToCheckout}
				/>
			</div>
		</section>
	)
}
