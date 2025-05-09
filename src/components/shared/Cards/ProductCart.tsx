'use client'
import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts'
import { ProductInCart } from '@/types/types'
import { handleQuantityChange } from '@/lib/cartActions'
import {
	Button,
	Heading,
	TrashIcon,
	QuantityCounter,
	Badge,
	ProductProtection,
} from '@/components'

export default function ProductCart({
	protection,
	product,
	removeProductFromCart,
	updateQuantity,
	updateProtection,
}: {
	protection: boolean
	product: ProductInCart
	removeProductFromCart?: (productId: number) => void
	updateQuantity?: (productId: number, newQuantity: number) => void
	updateProtection?: (productId: number, hasProtection: boolean) => void
}) {
	const [quantity, setQuantity] = useState<number>(product.quantity)
	const [, setAlert] = useContext(AlertContext)

	return (
		<div className='flex flex-col gap-6 p-6 bg-base-dark border border-gray-200 rounded-md flex-1'>
			<div className='flex flex-col sm:flex-row gap-8 rounded-md flex-1'>
				<div className='flex justify-center gap-8'>
					<div className='p-3 border border-gray-200 rounded-md md:min-w-[172px] md:min-h-[138px] md:max-h-[138px] md:max-w-[172px]'>
						<img
							src={
								product?.imageUrl
									? product?.imageUrl
									: 'https://i.ibb.co/1tZLQLS2/No-Image-Available.png'
							}
							alt='product'
							className='w-full h-full'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<div className='flex flex-col gap-3'>
						<div className='flex items-center justify-between'>
							<Heading
								size='xs'
								Tag='h6'
								weight='medium'
							>
								{product?.brandName} {product?.name}
							</Heading>
							{!protection && removeProductFromCart && (
								<Button
									className='opacity-70 hover:opacity-100'
									variant='text'
									iconRight={<TrashIcon />}
									size='xxs'
									onClick={() => {
										removeProductFromCart(product.id)
										setAlert({
											text: `${product.brandName} ${product.name} removed from cart`,
											type: 'success',
										})
									}}
								></Button>
							)}
						</div>
						<Badge>{product?.categoryName}</Badge>
					</div>
					<div className='flex justify-between items-center flex-wrap'>
						<Heading
							size='sm'
							Tag='h6'
							weight='medium'
						>
							${product?.price}
						</Heading>
						<div className='flex flex-col xs:flex-row'>
							<Button
								variant='text'
								className='whitespace-nowrap'
							>
								Write Note
							</Button>
							<div className='pl-5 border-l border-neutral-500'>
								<QuantityCounter
									size='md'
									quantity={quantity}
									setQuantity={(newQuantity) =>
										handleQuantityChange({
											newQuantity,
											product,
											setQuantity,
											updateQuantity,
											setAlert,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{protection && (
				<ProductProtection
					hasProtection={product.hasProtection}
					updateProtection={updateProtection}
					productId={product.id}
				/>
			)}
		</div>
	)
}
