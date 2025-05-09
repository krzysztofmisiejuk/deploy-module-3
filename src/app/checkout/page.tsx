import { getServerSession } from 'next-auth'
import { Metadata } from 'next'
import { Breadcrumps, Checkout } from '@/components'
import { authOptions } from '@/lib/authOptions'
import { getAddressByUserId, getOrderLength } from '@/lib/db'

export const metadata: Metadata = {
	title: 'Checkout',
}

export default async function CheckoutPage() {
	const session = await getServerSession(authOptions)
	const orderLength = await getOrderLength()
	const addresses = await getAddressByUserId(Number(session?.user.id))

	if (!addresses) {
		return <p>no adress provided</p>
	}

	return (
		<>
			<Breadcrumps />
			<Checkout
				addresses={addresses}
				orderLength={orderLength}
			/>
		</>
	)
}
