import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Alert, Footer, Header, SessionProviderWrapper } from '@/components'
import { AlertProvider, CartProvider } from '@/contexts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: {
		default: 'DevstockHub',
		template: '%s | DevstockHub',
	},
	description: 'an electronics shop',
	icons: {
		icon: 'https://i.ibb.co/sp5BZbVz/short-logo.png',
	},
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)
	return (
		<html
			lang='en'
			className={`${inter.className} light`}
		>
			<body className='h-full bg-base-gray-bg'>
				<SessionProviderWrapper>
					<AlertProvider>
						<div className='flex flex-col gap-2 rounded min-h-screen w-full max-w-[1440px]  mx-auto bg-base-dark-1'>
							<CartProvider>
								<Header session={session} />
								<Alert />
								<main className='flex-1 px-10 overflow-hidden'>{children}</main>
							</CartProvider>
							<Footer />
						</div>
					</AlertProvider>
				</SessionProviderWrapper>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
