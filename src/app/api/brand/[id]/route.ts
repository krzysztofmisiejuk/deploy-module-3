import { getBrandById } from '@/lib/db'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const brand = await getBrandById(+id)

		if (!brand) {
			return Response.json({ error: 'Brand not found' }, { status: 404 })
		}

		return Response.json({ brand }, { status: 200 })
	} catch (error) {
		console.error('Error GET :', error)
		return Response.json({ error }, { status: 500 })
	}
}
