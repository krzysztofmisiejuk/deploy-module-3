import { FormHeading, FormWrapper, Logo } from '@/components'

export default function RootLogin({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col justify-center items-center gap-8 my-[67px]'>
			<Logo size='lg' />
			<FormWrapper>
				<FormHeading>Sing In</FormHeading>
				{children}
			</FormWrapper>
		</div>
	)
}
