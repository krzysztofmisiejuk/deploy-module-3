import { Metadata } from 'next'
import { ProductList, Sidebar } from '@/components'
import { Product } from '@/types/types'
import { getProducts } from '@/lib/db'

export const metadata: Metadata = {
	title: 'Products',
}

export default async function Products({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const products: Product[] = await getProducts()
	const params = await searchParams
	const { brand, category, maxPrice, minPrice, order, page, limit } =
		params || {}

	const queryParams = new URLSearchParams()
	const currentOrder = order || 'lat'
	const currentPage = page ? Number(page) : 1
	const limitPerPage = limit ? Number(limit) : 9

	if (brand) {
		if (Array.isArray(brand)) {
			brand.forEach((b) => queryParams.append('brand', b))
		} else {
			queryParams.set('brand', brand)
		}
	}
	if (category) {
		if (Array.isArray(category)) {
			category.forEach((cat) => queryParams.append('category', cat))
		} else {
			queryParams.set('category', category)
		}
	}
	
	if (maxPrice) queryParams.set('maxPrice', maxPrice as string)
	if (minPrice) queryParams.set('minPrice', minPrice as string)
	queryParams.set('page', currentPage.toString())
	queryParams.set('limit', limitPerPage.toString())
	queryParams.set('order', currentOrder.toString())

	const BASE_URL = process.env.BASE_URL
	const apiUrl = `${BASE_URL}/api/product?${queryParams.toString()}`

	const response = await fetch(apiUrl, { cache: 'no-store' })
	const data = await response.json()

	return (
		<section className='flex flex-col items-center justify-center text-neutral-900'>
			
			<div className='flex flex-col md:flex-row w-full items-start justify-start flex-1'>
				<Sidebar products={products} />
				<ProductList
					products={data.products}
					numberOfProducts={data?.totalProducts}
				/>
			</div>
		</section>
	)
}
