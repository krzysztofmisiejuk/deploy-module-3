import { getProducts } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams

	const products = await getProducts()
	const page = parseInt(searchParams.get('page') || '1')
	const limit = parseInt(searchParams.get('limit') || '9')
	const order = searchParams.get('order') 
	const minPrice = parseFloat(searchParams.get('minPrice') || '0')
	const maxPrice = parseFloat(searchParams.get('maxPrice') || '10000')

	const brands = searchParams.getAll('brand')
	const categories = searchParams.getAll('category')

	let filtered = [...products]

	if (brands.length) {
		filtered = filtered.filter((p) => brands.includes(p.brandName))
	}

	if (categories.length) {
		filtered = filtered.filter((p) => categories.includes(p.categoryName))
	}

	filtered = filtered.filter((p) => {
		const priceAfterDiscount = p.discount ? p.discount : p.price
		return priceAfterDiscount >= minPrice && priceAfterDiscount <= maxPrice
	})

	if (order === 'lat') {
		filtered.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
	} else if (order === 'asc') {
		filtered.sort((a, b) => (a.discount || a.price) - (b.discount || b.price))
	} else if (order === 'dsc') {
		filtered.sort((a, b) => (b.discount || b.price) - (a.discount || a.price))
	}

	const totalProducts = filtered.length
	const totalPages = Math.ceil(totalProducts / limit)

	const start = (page - 1) * limit
	const paginated = filtered.slice(start, start + limit)

	return NextResponse.json({
		products: paginated,
		totalProducts,
		totalPages,
		page,
	})
}
