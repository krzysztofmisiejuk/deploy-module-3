export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
	const sizeClasses = {
		sm: 'w-52',
		md: 'w-60',
		lg: 'w-[320px]',
	}

	return (
		<img
			src='https://i.ibb.co/hxx3KHJR/logo-removebg-preview.png'
			alt='Logo'
			className={sizeClasses[size]}
		/>
	)
}
