import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Visa, MasterCard, Paypal, ApplePay, GooglePay } from '@/components'

export default function PaymentsList() {
	const icons = [Visa, MasterCard, Paypal, ApplePay, GooglePay]

	return (
		<div className='grid grid-cols-3 gap-3 w-max xs:flex'>
			{icons.map((IconComponent, index) => (
				<Badge
					variant='light'
					key={index}
					className='h-8 flex items-center justify-center'
				>
					<div className='flex items-center justify-center'>
						<IconComponent
							width='40'
							height='30'
						/>
					</div>
				</Badge>
			))}
		</div>
	)
}
