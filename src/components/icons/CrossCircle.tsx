import { IconsProps } from '@/types/types'

export default function CrossCircle({
	width = '30',
	height = '30',
	fill = '#FCA5A5',
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
				d='M20 10L10 20M10 10L20 20M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15Z'
				stroke={fill}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
