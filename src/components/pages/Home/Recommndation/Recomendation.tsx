import Loading from '@/components/loading'
import RecomendationCarousel from './RecomendationCarousel'
import { getProducts } from '@/lib/db'
import { Product, ProductInCart } from '@/types/types'

export default async function Recommendations() {
	const products: Product[] = await getProducts()
	const randomSixProducts = products.sort(() => Math.random() - 0.5).slice(0, 6)
	const randomProducts: ProductInCart[] = randomSixProducts.map((product) => ({
		...product,
		quantity: 1,
		hasProtection: false,
		isSelected: false,
		color: 'default',
	}))

		if (!randomProducts) {
			return <Loading />
		}

	return <RecomendationCarousel products={randomProducts} />
}
