'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from './Pagination'
import { ProductInCart } from '@/types/types'
import {
	ProductCard,
	Paragraph,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components'

type ProductListProps = {
	products: ProductInCart[]
	numberOfProducts: number
}

export default function ProductList({
	products,
	numberOfProducts,
}: ProductListProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get('page') || '1')
	const limit = parseInt(searchParams.get('limit') || '9')
	const order = searchParams.get('order') || 'lat'

	const totalPages = Math.ceil(numberOfProducts / limit)

	const updateParams = (params: Record<string, string | number>) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()))
		for (const key in params) {
			current.set(key, String(params[key]))
		}
		router.push(`?${current.toString()}`)
	}

	return (
		<div className='flex flex-col gap-10 p-10 border-t md:border-t-0 md:border-l  border-gray-200 w-full  h-full '>
			<div className='flex gap-y-10 gap-x-15 mx-auto md:mx-0 flex-wrap'>
				<Label className='flex gap-x-4 font-semibold text-xl whitespace-nowrap'>
					Sort by
					<Select
						value={order}
						onValueChange={(val) => updateParams({ order: val, page: 1 })}
					>
						<SelectTrigger>
							<SelectValue
								placeholder='Latest'
								className='text-sm'
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='lat'>Latest</SelectItem>
							<SelectItem value='asc'>Low to High</SelectItem>
							<SelectItem value='desc'>High to Low</SelectItem>
						</SelectContent>
					</Select>
				</Label>

				<Label className='flex gap-4 items-center font-semibold text-xl whitespace-nowrap'>
					Show
					<Select
						value={String(limit)}
						onValueChange={(v) => updateParams({ limit: v, page: 1 })}
					>
						<SelectTrigger>
							<SelectValue
								placeholder='9'
								className='text-sm'
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='9'>9</SelectItem>
							<SelectItem value='12'>12</SelectItem>
							<SelectItem value='15'>15</SelectItem>
						</SelectContent>
					</Select>
				</Label>
			</div>
			{products.length === 0 && (
				<Paragraph className='min-h-[5vh] grow mx-auto py-20'>
					No products matching your criteria were found
				</Paragraph>
			)}

			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center'>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>

			<Pagination
				currentPage={page}
				totalPages={totalPages}
				isNoProdusts={products.length === 0}
			/>
		</div>
	)
}
