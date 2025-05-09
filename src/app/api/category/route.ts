import { getCategories } from '@/lib/db'

export async function GET() {
	try {
		const categories = await getCategories()
		if (!categories) {
			return Response.json({ error: 'Categories not found' }, { status: 404 })
		}
		return Response.json({ categories }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}
