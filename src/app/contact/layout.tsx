import { Metadata } from 'next'
import { Breadcrumps } from '@/components'

export const metadata: Metadata = {
	title: 'Contact',
}

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='space-y-6'>
			<Breadcrumps />
			
			{children}
		</div>
	)
}
