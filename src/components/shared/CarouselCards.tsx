'use client'
import { useEffect, useState, useCallback } from 'react'
import { CarouselApi } from '@/components/ui/carousel'
import {
	Button,
	Heading,
	ArrowLeft,
	ArrowRight,
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components'

type CarouselCardProps<T> = {
	items: T[]
	renderItem: (item: T) => React.ReactNode
	cardWidth: number
	gap?: number
	title?: string
}

export default function CarouselCards<T>({
	items,
	renderItem,
	cardWidth,
	gap = 16,
	title = 'Recommendation',
}: CarouselCardProps<T>) {
	const [isAtEnd, setIsAtEnd] = useState(false)
	const [api, setApi] = useState<CarouselApi | null>(null)

	const checkPosition = useCallback(() => {
		if (api) {
			const canScrollNext = api.canScrollNext()
			setIsAtEnd(!canScrollNext)
		}
	}, [api])

	useEffect(() => {
		if (!api) return

		checkPosition()
		api.on('reInit', checkPosition)
		api.on('scroll', checkPosition)
		window.addEventListener('resize', checkPosition)

		return () => {
			api.off('reInit', checkPosition)
			api.off('scroll', checkPosition)
			window.removeEventListener('resize', checkPosition)
		}
	}, [api, checkPosition])

	const handleSeeAll = () => {
		if (api) {
			api.scrollTo(items.length - 1)
		}
	}

	const handleBackToStart = () => {
		if (api) {
			api.scrollTo(0)
		}
	}

	const itemWidth = cardWidth + gap

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex justify-between items-center flex-wrap'>
				<Heading
					size='md'
					weight='medium'
					Tag='h4'
					className='text-neutral-900'
				>
					{title}
				</Heading>
				<Button
					variant='text'
					size='lg'
					onClick={isAtEnd ? handleBackToStart : handleSeeAll}
				>
					{isAtEnd ? (
						<ArrowLeft />
					) : (
						<div className='flex items-center gap-2'>
							<span>See All</span>
							<ArrowRight />
						</div>
					)}
				</Button>
			</div>

			<Carousel
				className='w-full carousel-container'
				opts={{ align: 'start', loop: false }}
				setApi={setApi}
			>
				<CarouselContent style={{ marginLeft: -gap }}>
					{items.map((item, index) => (
						<CarouselItem
							key={index}
							style={{
								paddingLeft: gap,
								flexBasis: `${itemWidth}px`,
							}}
						>
							{renderItem(item)}
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
