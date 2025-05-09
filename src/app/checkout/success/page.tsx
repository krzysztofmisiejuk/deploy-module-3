import { getServerSession } from 'next-auth'
import CheckoutSuccess from '@/components/pages/CheckoutSuccess/CheckoutSuccess'
import { authOptions } from '@/lib/authOptions'
import { getOrdersByUserId } from '@/lib/db'

export default async function CheckoutSuccessPage() {
	const session = await getServerSession(authOptions)
	const userId = session?.user?.id
	const orders = await getOrdersByUserId(Number(userId))

	return <CheckoutSuccess lastOrder={orders[0]} />
}
