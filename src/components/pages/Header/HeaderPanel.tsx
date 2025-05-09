'use client'
import { Session } from 'next-auth'
import HeaderIconList from './HeaderIconList'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'

export default function HeaderPanel({ session }: { session: Session | null }) {
	const router = useRouter()

	return (
		<>
			{session ? (
				<HeaderIconList userImg={session.user.image} />
			) : (
				<Button
					size='xl'
					className='md:w-[121px]'
					onClick={() => router.push('/login')}
				>
					Sing In
				</Button>
			)}
		</>
	)
}
