'use client'
import Link from 'next/link'
import { BrandsProps } from '@/types/types'
import { CarouselCards, TileCard } from '@/components/shared'

export default function BrandsCarousel({ brands }: { brands: BrandsProps[] }) {
	return (
		<CarouselCards
			items={brands}
			renderItem={(brand) => (
				<Link
					key={brand.id}
					href={`/product?brand=${brand.name}&page=1&limit=9`}
					prefetch={false}
				>
					<TileCard item={brand} />
				</Link>
			)}
			cardWidth={220}
			gap={32}
			title='Brand'
		/>
	)
}
