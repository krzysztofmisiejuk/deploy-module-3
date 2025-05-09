import { getUserById } from "@/lib/db"

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const user = await getUserById(+id)

		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 })
		}

		return Response.json({ data: user }, { status: 200 })
	} catch (error) {
		console.error('Error GET :', error)
		return Response.json({ error }, { status: 500 })
	}
}
