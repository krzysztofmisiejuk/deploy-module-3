import { IconsProps } from '@/types/types'
export default function ChevronDown({
	width = '24',
	height = '24',
	fill = '#262626',
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
				d='M4 9L12 17L20 9'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
