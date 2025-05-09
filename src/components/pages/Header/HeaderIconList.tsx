import Link from 'next/link'
import { CartIcon } from '@/components'

export default function HeaderIconList({ userImg }: { userImg: string }) {
	return (
		<div className='flex items-center justify-between gap-7 '>
			<Link href='/cart'>
				<CartIcon />
			</Link>
			<Link href='/profile'>
				<div className='rounded-full h-10 w-10 overflow-hidden'>
					<img
						src={userImg}
						alt='profileImg'
					/>
				</div>
			</Link>
		</div>
	)
}
