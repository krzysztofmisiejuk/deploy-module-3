import { Metadata } from 'next'
import { Breadcrumps, ProductDetailCard } from '@/components'
import { getEstimatedArrival } from '@/lib/utils'
import { Product, ProductDetailParamProps } from '@/types/types'

export const metadata: Metadata = {
	title: 'Product Details',
}

export default async function ProductDetails({
	params,
}: ProductDetailParamProps) {
	const { id } = await params
	const baseUrl = process.env.BASE_URL
	const response = await fetch(`${baseUrl}/api/product/${id}`)
	const product: Product = await response.json()
	const randomDate: string = getEstimatedArrival()

	return (
		<section className='flex flex-col'>
			<Breadcrumps />
			<ProductDetailCard
				product={product}
				randomDate={randomDate}
			/>
		</section>
	)
}
