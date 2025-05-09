import { IconsProps } from '@/types/types'

export default function MinusIcon({
	width = '21',
	height = '20',
	fill = '#FCFCFC',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 21 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M3.83398 10H17.1673'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
