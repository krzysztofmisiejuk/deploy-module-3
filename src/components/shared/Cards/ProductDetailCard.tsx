'use client'
import { useContext, useState } from 'react'
import { Product, ProductInCart } from '@/types/types'
import { AlertContext } from '@/contexts'
import { loadCart, saveCart, handleQuantityChange } from '@/lib/cartActions'
import {
	Button,
	Heading,
	Paragraph,
	CartIcon,
	ShieldCross,
	QuantityCounter,
	Badge,
	Checkbox,
} from '@/components'

const firstImgSrc = 'https://i.ibb.co/HTgqJJkJ/monitor.png'
const secondImgSrc = 'https://i.ibb.co/5xXF2grX/keyboard.png'

export default function ProductDetailCard({
	product,
	randomDate,
}: {
	product: Product
	randomDate: string
}) {
	const [, setAlert] = useContext(AlertContext)
	const [mainImg, setMainImg] = useState(product.imageUrl || '')
	const [showDesc, setShowDesc] = useState(false)
	const [quantity, setQuantity] = useState<number>(1)
	const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white')

	function setColor(color: 'white' | 'black') {
		setSelectedColor((prev) => (prev === color ? 'white' : color))
	}

	function addToCart() {
		if (quantity > product.stock) {
			setAlert({ text: 'Not enough stock available', type: 'error' })
			return
		}

		const cart = loadCart()
		const existingProduct = cart.find(
			(item) => item.id === product.id && item.color === selectedColor
		)

		let updatedCart: ProductInCart[]

		if (existingProduct) {
			const newQuantity = existingProduct.quantity + quantity
			if (newQuantity > product.stock) {
				setAlert({
					text: 'Cannot add more than available stock',
					type: 'error',
				})
				return
			}
			updatedCart = cart.map((item) =>
				item.id === product.id && item.color === selectedColor
					? { ...item, quantity: newQuantity }
					: item
			)
		} else {
			updatedCart = [
				...cart,
				{
					...product,
					quantity,
					hasProtection: true,
					isSelected: true,
					color: selectedColor,
				},
			]
		}

		saveCart(updatedCart)
		setAlert({
			text: `${product.brandName} ${product.name} added to cart!`,
			type: 'success',
		})
	}

	return (
		<div className='flex flex-wrap gap-8 py-10 text-neutral-900'>
			<div className='flex flex-col md:flex-row gap-12 pb-12 flex-grow basis-2/3 min-w-[325px] border-b border-gray-200'>
				<div className='flex flex-col gap-8 flex-grow basis-1/2 min-w-[325px]'>
					<div className='relative p-3 min-h-[340px] bg-base-dark border border-gray-200 rounded-md'>
						{mainImg && (
							<img
								src={mainImg}
								alt={product.name}
								className='w-full h-full rounded-md'
							/>
						)}
					</div>
					<div className='flex gap-4'>
						<div className='bg-gray-400 flex-grow basis-1/3 min-h-[99px] rounded-md'>
							{product.imageUrl && (
								<img
									src={product.imageUrl}
									alt=''
									onClick={(e) => {
										setMainImg((e.target as HTMLImageElement).src)
									}}
									className={`h-full w-full rounded-md ${
										mainImg === product.imageUrl &&
										'border-2 border-primary-500 rounded-md'
									}`}
								/>
							)}
						</div>
						<div className='bg-gray-500 flex-grow basis-1/3 min-h-[99px] rounded-md'>
							<img
								src={firstImgSrc}
								alt='img-2'
								onClick={(e) => {
									setMainImg((e.target as HTMLImageElement).src)
								}}
								className={`h-full w-full rounded-md ${
									mainImg === firstImgSrc &&
									'border-2 border-primary-500 rounded-md'
								}`}
							/>
						</div>
						<div className='bg-gray-600 flex-grow basis-1/3 min-h-[99px] rounded-md'>
							<img
								src={secondImgSrc}
								alt='img-3'
								onClick={(e) => {
									setMainImg((e.target as HTMLImageElement).src)
								}}
								className={`h-full w-full rounded-md ${
									mainImg === secondImgSrc &&
									'border-2 border-primary-500 rounded-md'
								}`}
							/>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-8 flex-grow basis-1/2 min-w-[325px] rounded'>
					<div className='flex flex-col gap-5'>
						<Heading
							Tag='h2'
							weight='medium'
						>
							{product.brandName} {product.name}
						</Heading>
						<Badge>{product.categoryName}</Badge>
					</div>
					<Heading
						Tag='h3'
						size='xl'
						weight='medium'
					>
						${product.price}
					</Heading>
					<div className='h-[150px]'>
						<Paragraph>
							{showDesc
								? product.description
								: product.description.slice(0, 120) + '...'}
						</Paragraph>
						<Button
							variant='text'
							size='xxs'
							onClick={() => {
								setShowDesc((prevState) => !prevState)
							}}
						>
							{showDesc ? 'Show less' : 'View more'}
						</Button>
					</div>

					<div className='flex flex-col gap-3.5'>
						<Paragraph className='text-neutral-500'>
							Shipping Available
						</Paragraph>
						<div className='flex items-start gap-4 border border-neutral-900 p-4 rounded w-fit'>
							<ShieldCross />
							<div>
								<Paragraph
									weight='medium'
									className='text-neutral-900'
								>
									NexusHub Courier
								</Paragraph>
								<Paragraph className='text-neutral-500'>{randomDate}</Paragraph>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-8 p-6 bg-base-dark border border-gray-200 rounded flex-grow basis-[30%] min-w-[325px] h-fit'>
				<div className='flex flex-col gap-3.5 w-fit'>
					<Paragraph
						size='lg'
						className='text-neutral-500'
					>
						Colors
					</Paragraph>
					<div className='flex gap-4'>
						<Checkbox
							variant='white'
							checked={selectedColor === 'white'}
							onCheckedChange={() => setColor('white')}
						/>
						<Checkbox
							variant='black'
							checked={selectedColor === 'black'}
							onCheckedChange={() => setColor('black')}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-3.5'>
					<Paragraph
						size='lg'
						className='text-neutral-500'
					>
						Quantity
					</Paragraph>
					<div className='flex items-center'>
						<QuantityCounter
							setQuantity={(newQuantity) =>
								handleQuantityChange({
									newQuantity,
									product,
									setQuantity,
									setAlert,
									updateQuantity: undefined,
								})
							}
							quantity={quantity}
						/>
						<span className='ml-4'>Stock: {product.stock}</span>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<Paragraph
						size='lg'
						className='text-neutral-500'
					>
						Subtotal
					</Paragraph>
					<Heading
						Tag='h5'
						size='md'
						weight='medium'
					>
						${(+product.price * quantity).toFixed(2)}
					</Heading>
				</div>
				<Button
					variant='stroke'
					size='xl'
					iconRight={<CartIcon fill='#F29145' />}
					className='w-full'
					onClick={addToCart}
				>
					Add to Cart
				</Button>
			</div>
		</div>
	)
}
