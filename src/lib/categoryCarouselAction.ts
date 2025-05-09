import clsx from 'clsx'

export function getImageClass(name: string) {
	return clsx(
		'absolute object-cover z-0',
		name.toLowerCase() === 'keyboard' &&
			'right-[-20%] top-[0%] rotate-[-25deg] h-[870px]',
		name.toLowerCase() === 'headphone' &&
			'right-[10%] top-[-65%] rotate-[-5deg] h-[960px]',
		name.toLowerCase() === 'webcam' && 'right-[5] top-[-25%] h-[750px]',
		name.toLowerCase() === 'monitor' && 'right-[7%] top-[-10%] h-[650px]',
		name.toLowerCase() === 'mouse' && 'right-[0%] top-[0%] h-[470px]'
	)
}
