
import { getProducts } from '@/lib/db' 

export async function GET() {
	try {
		const products = await getProducts()

		const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, 6)

		return Response.json({ randomProducts }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error }, { status: 500 })
	}
}
