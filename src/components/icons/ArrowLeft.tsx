import { IconsProps } from '@/types/types'

export default function ArrowLeft({
	width = '24',
	height = '24',
	fill = '#F29145',
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
				d='M4 12L20 12M4 12L10 6M4 12L10 18'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
