import { getBrands } from '@/lib/db'
import BrandsCarousel from './BrandsCarousel'
import { BrandsProps } from '@/types/types'
import Loading from '@/components/loading'

export default async function Brands() {
	const brands: BrandsProps[] = await getBrands()

	if (!brands) {
		return <Loading />
	}

	return (
		<div className='flex flex-col gap-8'>
			<BrandsCarousel brands={brands} />
		</div>
	)
}
