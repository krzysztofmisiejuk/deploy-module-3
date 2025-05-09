import { IconsProps } from '@/types/types'
export default function ChevronLeft({
	width = '10',
	height = '18',
	fill = '#262626',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 10 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9 1L1 9L9 17'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
