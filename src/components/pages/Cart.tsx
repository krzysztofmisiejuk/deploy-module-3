'use client'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { CartContext } from '@/contexts'
import {
	CheckboxField,
	Paragraph,
	PriceSummary,
	ProductCart,
} from '@/components'
import { updateCartQuantity } from '@/lib/cartActions'

export default function Cart() {
	const { productList, setProductList } = useContext(CartContext)!
	const [isSelectAll, setIsSelectAll] = useState<boolean>(true)
	const router = useRouter()

	useEffect(() => {
		setIsSelectAll(
			productList.length > 0 &&
				productList.every((product) => product.isSelected)
		)
	}, [productList])

	function removeProductFromCart(productId: number) {
		const updatedCart = productList.filter((item) => item.id !== productId)
		setProductList(updatedCart)
		setIsSelectAll(
			updatedCart.length > 0 &&
				updatedCart.every((product) => product.isSelected)
		)
	}

	function handleSelectAllChange(checked: boolean) {
		setIsSelectAll(checked)
		const updatedCart = productList.map((product) => ({
			...product,
			isSelected: checked,
		}))
		setProductList(updatedCart)
	}

	const handleProductCheckboxChange = (productId: number, checked: boolean) => {
		const updatedCart = productList.map((product) =>
			product.id === productId ? { ...product, isSelected: checked } : product
		)
		setProductList(updatedCart)
		setIsSelectAll(updatedCart.every((product) => product.isSelected))
	}

	function goToCheckout() {
		router.push('/checkout')
	}

	return (
		<section className='flex justify-center gap-12 py-10 text-neutral-900 w-full flex-col lg:flex-row'>
			<div className='flex flex-col gap-8 flex-1 w-full'>
				{productList.length === 0 && <Paragraph>Cart is empty</Paragraph>}
				{productList.length > 0 && (
					<>
						<CheckboxField
							id='select-all'
							checked={isSelectAll}
							onChange={handleSelectAllChange}
							labelText='Select All'
						/>
						{productList.map((product) => (
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
											productList,
											setProductList,
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
					productList={productList}
					checkout={false}
					onClickHandle={goToCheckout}
				/>
			</div>
		</section>
	)
}
