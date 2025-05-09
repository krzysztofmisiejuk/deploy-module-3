import { getProductById } from '@/lib/db'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const product = await getProductById(+id)

		if (!product) {
			return Response.json({ error: 'Product not found' }, { status: 404 })
		}

		return Response.json(product, { status: 200 })
	} catch (error) {
		console.error('Error GET :', error)
		return Response.json({ error }, { status: 500 })
	}
}
