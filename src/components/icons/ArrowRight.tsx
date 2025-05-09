import { IconsProps } from '@/types/types'

export default function ArrowRight({
	width = '24',
	height = '24',
	fill = '#F29145',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M20 12L4 12M20 12L14 18M20 12L14 6'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
