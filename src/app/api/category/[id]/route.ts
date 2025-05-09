import { getCategoryById } from '@/lib/db'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const category = await getCategoryById(+id)

		if (!category) {
			return Response.json({ error: 'Category not found' }, { status: 404 })
		}

		return Response.json({ category }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}
