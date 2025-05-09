import { Nav } from '.'
import { Logo } from '@/components'
import HeaderPanel from './HeaderPanel'
import { Session } from 'next-auth'


export default async function Header({ session }: { session: Session | null }) {
	// const session = {
	// 	user: {
	// 		name: 'user 1',
	// 		email: 'user1@email.com',
	// 		image: 'https://i.ibb.co/HTgqJJkJ/monitor.png',
	// 		id: '1',
	// 	},
	// }

	return (
		<header className='flex flex-col gap-10 px-10 py-8  text-neutral-900'>
			<div className='flex  justify-center sm:justify-between flex-col-reverse gap-y-3 sm:flex-row text-2xl sm:text-3xl rounded-md font-semibold'>
				<Logo />
				<HeaderPanel session={session} />
			</div>
			{session && <Nav />}
			<div className='w-full h-[1px] bg-gray-200'></div>
		</header>
	)
}
