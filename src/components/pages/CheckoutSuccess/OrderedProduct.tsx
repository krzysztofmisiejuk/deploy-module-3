import { Heading, Paragraph } from '@/components'
import { Badge } from '@/components/ui/badge'
import { ProductInCart } from '@/types/types'

export default function OrderedProduct({
	product,
}: {
	product: ProductInCart
}) {
	return (
		<div
			key={product.id}
			className='flex flex-col sm:flex-row gap-8 p-4 w-full border border-gray-200 rounded-md'
		>
			<div className='flex items-center justify-between'>
				<div className='flex justify-center gap-8'>
					<div className='p-3 border border-gray-200 rounded-md md:min-w-[172px] md:min-h-[138px] md:max-h-[138px] md:max-w-[172px]'>
						<img
							src={
								product?.imageUrl
									? product.imageUrl
									: 'https://i.ibb.co/1tZLQLS2/No-Image-Available.png'
							}
							alt={product.name}
							className='w-full h-full'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-4 w-full'>
				<Heading
					size='xs'
					Tag='h6'
					weight='medium'
				>
					{product?.brandName} {product?.name}
				</Heading>
				<Badge>{product?.categoryName}</Badge>
				<div className='flex justify-between items-center w-full'>
					<Heading
						size='sm'
						Tag='h6'
						weight='medium'
					>
						${product?.price}
					</Heading>
					<Paragraph>x{product?.quantity}</Paragraph>
				</div>
			</div>
		</div>
	)
}
