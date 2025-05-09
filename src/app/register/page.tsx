import { Metadata } from 'next'
import { FormWrapper, RegisterForm, Logo } from '@/components'

export const metadata: Metadata = {
	title: 'Register',
}

export default async function Register() {
	return (
		<div className='flex flex-col justify-center items-center gap-8 my-[67px]'>
			<Logo size='lg'/>
			<FormWrapper>
				<RegisterForm />
			</FormWrapper>
		</div>
	)
}
