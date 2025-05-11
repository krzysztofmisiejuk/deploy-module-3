'use client'
import { Session } from 'next-auth'
import HeaderIconList from './HeaderIconList'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'

export default function HeaderPanel({ session }: { session: Session | null }) {
	const router = useRouter()

	return (
		<div className='flex justify-between'>
			{session ? (
				<HeaderIconList userImg={session.user.image} />
			) : (
				<Button
					size='xl'
					className='max-w-[121px] ml-auto'
					onClick={() => router.push('/login')}
				>
					Sing In
				</Button>
			)}
		</div>
	)
}
