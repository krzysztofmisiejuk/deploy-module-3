'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navRoutesData } from '@/data/navRoutesData'

export default function Nav() {
	const pathname = usePathname()
	return (
		<nav className='flex gap-x-11 xs:gap-x-12 text-base'>
			{navRoutesData.map(({ route, pageName }) => {
				return (
					<Link
						key={pageName}
						href={route}
						className={`
							${route === pathname ? 'text-primary-400 font-semibold' : 'text-neutral-500'} 
							hover:text-neutral-900 transition
						  `}
					>
						{pageName}
					</Link>
				)
			})}
		</nav>
	)
}
