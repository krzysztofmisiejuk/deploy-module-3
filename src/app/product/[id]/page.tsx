import { Metadata } from 'next'
import { Breadcrumps, ProductDetailCard } from '@/components'
import { getEstimatedArrival } from '@/lib/utils'
import { ProductDetailParamProps } from '@/types/types'
import { getProductById } from '@/lib/db'

export const metadata: Metadata = {
	title: 'Product Details',
}

export default async function ProductDetails({
	params,
}: ProductDetailParamProps) {
	const { id } = await params
	const product = await getProductById(Number(id))
	const randomDate: string = getEstimatedArrival()

	if (!product) {
		return <div>Product not found</div>
	}

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
