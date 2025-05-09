'use client'
import { CarouselCards, ProductCard } from '@/components'
import { ProductInCart } from '@/types/types'

export default function RecomendationCarousel({
	products,
}: {
	products: ProductInCart[]
}) {
	return (
		<CarouselCards
			items={products}
			renderItem={(product) => <ProductCard product={product} />}
			cardWidth={300}
			gap={32}
			title='Recommendation'
		/>
	)
}
