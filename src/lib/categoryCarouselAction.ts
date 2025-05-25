import clsx from 'clsx'

export function getImageClass(name: string) {
	return clsx(
		'absolute object-cover z-0',
		name.toLowerCase() === 'keyboard' &&
			'right-[-8%] top-[10%] rotate-[-25deg] h-full w-[870px]',
		name.toLowerCase() === 'headphone' &&
			'right-[10%] top-[-5%] rotate-[-5deg] h-[660px] w-[460px]',
		name.toLowerCase() === 'webcam' && 'right-[7%] top-[-15%] h-[550px] w-[560px]',
		name.toLowerCase() === 'monitor' && 'right-[3%] top-[-10%] h-[650px] w-[700px]',
		name.toLowerCase() === 'mouse' && 'right-[5%] top-[0%] h-[470px] w-[700px]'
	)
}
