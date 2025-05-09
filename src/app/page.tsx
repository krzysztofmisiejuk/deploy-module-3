import {
	Brands,
	Categories,
	CategoryCarousel,
	Recommendations,
} from '@/components'
import { getCategories } from '@/lib/db'
import { CategoriesProps } from '@/types/types'



export default async function Home() {
	const categories: CategoriesProps[] = await getCategories()
	return (
		<div className='flex flex-col gap-24 pb-20'>
			<CategoryCarousel categories={categories} />
			<Categories categories={categories} />
			<Recommendations />
			<Brands />
		</div>
	)
}
