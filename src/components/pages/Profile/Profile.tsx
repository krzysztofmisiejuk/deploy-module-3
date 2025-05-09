'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { Button, Paragraph } from '@/components'
import { ProfileInfo, Transaction } from '.'
import { OrderType, AddressType } from '@/types/types'
import ProfileAddress from './ProfileAddress'

interface ProfilePropsType {
	session: {
		user: {
			name: string
			email: string
			image?: string
			id: string
		}
	}
	orders: OrderType[]
	addresses: AddressType[]
}

export default function Profile({
	session,
	orders,
	addresses,
}: ProfilePropsType) {
	const [showTransactions, setShowTransactions] = useState<boolean>(true)
	const [showAdresses, setShowAdresses] = useState<boolean>(false)

	return (
		<section className='flex flex-col md:flex-row gap-12 py-10 text-neutral-900'>
			<ProfileInfo session={session} />
			<div className='flex flex-col flex-1 gap-8'>
				<div>
					<Button
						variant='underline'
						className={clsx(
							'mx-auto md:mx-0',
							showTransactions &&
								'text-primary-500 border-b-2 border-primary-500'
						)}
						onClick={() => {
							setShowTransactions(true)
							setShowAdresses(false)
						}}
					>
						Transaction
					</Button>
					<Button
						variant='underline'
						className={clsx(
							'mx-auto md:mx-0',
							showAdresses && 'text-primary-500 border-b-2 border-primary-500'
						)}
						onClick={() => {
							setShowAdresses(true)
							setShowTransactions(false)
						}}
					>
						Adresses
					</Button>
				</div>

				{showTransactions &&
					(orders.length > 0 ? (
						orders.map((order) => (
							<Transaction
								key={order.id}
								order={order}
							/>
						))
					) : (
						<Paragraph>No transactions</Paragraph>
					))}

				{showAdresses &&
					(addresses ? (
						addresses.map((address) => {
							return <ProfileAddress key={address?.id} address={address} />
						})
					) : (
						<Paragraph>No addresses</Paragraph>
					))}
			</div>
		</section>
	)
}
