import { PaymentsList, FooterList } from '.'
import { Paragraph, Logo } from '@/components'

export default function Footer() {
	return (
		<footer className='flex flex-row flex-wrap mb-0  py-36 px-16 bg-gray-50 text-neutral-600 '>
			<div className='flex flex-col gap-6 md:w-2/5 md:min-w-xs'>
				<Logo />
				<Paragraph className='max-w-52'>
					© 2025 DevstockHub. All rights reserved.
				</Paragraph>
				<PaymentsList />
			</div>
			<FooterList />
		</footer>
	)
}
