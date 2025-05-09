import { IconsProps } from '@/types/types'

export default function PlusIcon({
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
				d='M3.83398 9.99992H17.1673M10.5007 3.33325V16.6666'
				stroke={fill}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
