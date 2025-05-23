import { IconsProps } from '@/types/types'

export default function EyeOpen({
	width = '24',
	height = '24',
	fill = '#B0B0B0',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.9999 5C8.24249 5 5.4359 7.4404 3.76725 9.43934C2.51508 10.9394 2.51508 13.0606 3.76725 14.5607C5.4359 16.5596 8.24249 19 11.9999 19C15.7573 19 18.5639 16.5596 20.2325 14.5607C21.4847 13.0606 21.4847 10.9394 20.2325 9.43934C18.5639 7.4404 15.7573 5 11.9999 5Z'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M11.9999 15C13.6567 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6567 9 11.9999 9C10.343 9 8.99988 10.3431 8.99988 12C8.99988 13.6569 10.343 15 11.9999 15Z'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
