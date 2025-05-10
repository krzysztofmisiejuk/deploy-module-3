import Link from 'next/link'
import { CartIcon } from '@/components'
import Image from 'next/image'

export default function HeaderIconList({ userImg }: { userImg: string }) {
	return (
		<div className='flex items-center justify-between gap-7 '>
			<Link
				href='/cart'
				aria-label='Cart'
			>
				<CartIcon />
			</Link>
			<Link
				href='/profile'
				aria-label='Profile'
			>
				<div className='rounded-full h-10 w-10 overflow-hidden'>
					<Image
						src={userImg}
						width={100}
						height={100}
						alt='profileImg'
					/>
				</div>
			</Link>
		</div>
	)
}
