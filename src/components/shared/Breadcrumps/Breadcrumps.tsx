import { Breadcrumb } from '@/components'
import BreadCrumpItems from './BreadCrumpsItem'
import { getProducts } from '@/lib/db'

export default async function Breadcrumps() {
	const products = await getProducts()
	return (
		<Breadcrumb className='flex gap-2 py-2.5'>
			<BreadCrumpItems products={products}/>
		</Breadcrumb>
	)
}
