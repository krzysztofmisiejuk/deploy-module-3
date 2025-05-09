'use client'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Button, Heading, Paragraph, ArrowRight } from '@/components'
import { CategoriesProps } from '@/types/types'
import { getImageClass } from '@/lib/categoryCarouselAction'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	type CarouselApi,
} from '@/components/ui/carousel'

export default function CategoryCarousel({
	categories,
}: {
	categories: CategoriesProps[]
}) {
	const [api, setApi] = useState<CarouselApi | null>(null)
	const [valid, setValid] = useState(0)
	const [number, setNumber] = useState(0)
	const router = useRouter()

	useEffect(() => {
		if (!api) return

		setNumber(api.scrollSnapList().length)
		setValid(api.selectedScrollSnap())
		api.on('select', () => {
			setValid(api.selectedScrollSnap())
		})

		return () => {
			api.off('select', () => {})
		}
	}, [api])

	return (
		<div className='flex flex-col gap-6'>
			<Carousel
				setApi={setApi}
				className='w-full'
			>
				<CarouselContent>
					{categories.map((category) => (
						<CarouselItem key={category.id}>
							<div>
								<div className='relative flex items-center gap-2.5 px-20 py-14 md:px-30 md:py-20 h-[452px] bg-gray-50 rounded border border-gray-200 overflow-hidden'>
									<div className='absolute inset-0 bg-gray-50 opacity-70 lg:opacity-20 z-10'></div>
									<div className='relative flex flex-col gap-10 max-w-[433px] z-20'>
										<Heading
											Tag='h4'
											className='text-neutral-900'
										>
											{category.name}
										</Heading>
										<Paragraph className='text-neutral-600'>
											{category.description}
										</Paragraph>

										<Button
											variant='stroke'
											size='xl'
											iconRight={<ArrowRight />}
											className='max-w-[211px]'
											onClick={() => {
												router.push(
													`/product?category=${category.name}&page=1&limit=9`
												)
											}}
										>
											Explore Category
										</Button>
									</div>

									{category.imgCarousel && (
										<img
											src={category.imgCarousel}
											alt={category.name}
											className={getImageClass(category.name)}
										/>
									)}
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			<div className='flex justify-center gap-4'>
				{Array.from({ length: number }).map((_, index) => (
					<button
						key={index}
						onClick={() => api?.scrollTo(index)}
						className={clsx(
							'w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer',
							index === valid ? 'bg-primary-500' : 'bg-gray-200'
						)}
						aria-label={`Przejdź do slideu ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
