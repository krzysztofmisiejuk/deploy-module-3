import { Metadata } from 'next'
import { LoginFormStepOne } from '@/components'

export const metadata: Metadata = {
	title: 'Login',
}

export default function LoginStepOne() {
	return <LoginFormStepOne />
}
