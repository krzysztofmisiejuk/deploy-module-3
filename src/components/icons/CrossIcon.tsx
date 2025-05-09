import { IconsProps } from '@/types/types'

export default function CrossIcon({
	width = '30',
	height = '30',
	fill = '#FCFCFC',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 30 30'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M23.75 6.25L6.25 23.75M6.25004 6.25L23.7501 23.75'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
