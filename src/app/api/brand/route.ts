import { getBrands } from "@/lib/db"


export async function GET() {
    try {
        const brand = await getBrands()
        if (!brand) {
            return Response.json({ error: 'Brands not found' }, { status: 404 })
        }
        return Response.json({ brand }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return Response.json({ error }, { status: 500 })
    }
}
