'use client'
import { usePathname, useRouter } from 'next/navigation'
import { navRoutesData } from '@/data/navRoutesData'

export default function Nav() {
	const pathname = usePathname()
	const router = useRouter()

	function handleNav(route: string) {
		router.push(route, { scroll: false })
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<nav className='flex gap-x-11 xs:gap-x-12 text-base'>
			{navRoutesData.map(({ route, pageName }) => {
				return (
					<button
						key={pageName}
						onClick={() => handleNav(route)}
						className={`
							${route === pathname ? 'text-primary-400 font-semibold' : 'text-neutral-500'} 
							hover:text-neutral-900 transition
						`}
					>
						{pageName}
					</button>
				)
			})}
		</nav>
	)
}
