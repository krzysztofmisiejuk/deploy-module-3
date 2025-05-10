'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image' // Import komponentu Image
import { Button, Paragraph } from '@/components'

interface ProfilePropsType {
	session: {
		user: {
			name: string
			email: string
			image?: string
			id: string
		}
	}
}

export default function ProfileInfo({ session }: ProfilePropsType) {
	return (
		<div className='flex flex-col gap-6 p-6 bg-base-dark border border-gray-200 rounded-md md:max-w-[320px] w-full h-fit'>
			<div className='flex items-center gap-6 pb-6 border-b border-gray-200'>
				{session.user.image ? (
					<Image
						src={session.user.image}
						alt='profileImg'
						width={72}
						height={72}
						className='rounded-full'
						priority={true}
					/>
				) : (
					<div className='w-[72px] h-[72px] rounded-full bg-gray-300' />
				)}
				<div className='flex flex-col gap-1'>
					<Paragraph weight='medium'>{session.user.name}</Paragraph>
					<Paragraph size='sm'>{session.user.email}</Paragraph>
				</div>
			</div>
			<Button
				variant='logout'
				size='xxs'
				onClick={() => signOut()}
				className='w-fit'
			>
				Logout
			</Button>
		</div>
	)
}
