import { Paragraph, BagIcon } from '@/components'
import { OrderType } from '@/types/types'

export default function Transaction({ order }: { order: OrderType }) {
	return (
		<div className='flex gap-4 p-4 bg-base-dark border border-gray-200 rounded-md w-full'>
			<BagIcon />
			<div className='flex flex-col gap-4'>
				<Paragraph className='text-neutral-600'>
					{new Date(order.createdAt).toDateString()}
				</Paragraph>
				<div>
					<Paragraph
						weight='medium'
						size='lg'
					>
						Your order nr {order.orderNumber}
					</Paragraph>
					<ul className='list-disc pl-5'>
						{order.products.map((product) => {
							return (
								<li
									key={product.id}
									className='font-medium text-lg'
								>
									{product.brandName} {product.name}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}
