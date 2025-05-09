import { IconsProps } from '@/types/types'

export default function WarningCircle({
	width = '30',
	height = '29',
	fill = '#CA9A04',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 30 29'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M15 20.5296V20.5416M15 8.45833V16.9167M26.25 14.5C26.25 20.5061 21.2132 25.375 15 25.375C8.7868 25.375 3.75 20.5061 3.75 14.5C3.75 8.4939 8.7868 3.625 15 3.625C21.2132 3.625 26.25 8.4939 26.25 14.5Z'
				stroke={fill}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
