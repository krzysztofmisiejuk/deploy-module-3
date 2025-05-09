import { getBrands } from '@/lib/db'
import BrandsCarousel from './BrandsCarousel'
import { BrandsProps } from '@/types/types'

export default async function Brands() {
	const brands: BrandsProps[] = await getBrands()

	return (
		<div className='flex flex-col gap-8'>
			<BrandsCarousel brands={brands} />
		</div>
	)
}
