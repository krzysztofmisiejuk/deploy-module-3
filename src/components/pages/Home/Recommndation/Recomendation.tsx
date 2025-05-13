import RecomendationCarousel from './RecomendationCarousel'
import { getProducts } from '@/lib/db'
import { Product, ProductInCart } from '@/types/types'

export default async function Recommendations() {
	const products: Product[] = await getProducts()
	const randomProducts6 = products.sort(() => Math.random() - 0.5).slice(0, 6)
	const randomProducts: ProductInCart[] = randomProducts6.map((product) => ({
		...product,
		quantity: 1,
		hasProtection: false,
		isSelected: false,
		color: 'default',
	}))

	return <RecomendationCarousel products={randomProducts} />
}
