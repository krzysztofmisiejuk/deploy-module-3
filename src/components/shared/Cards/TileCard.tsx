'use client'
import { Heading, Card, CardContent } from '@/components'
import Image from 'next/image'
import clsx from 'clsx'
import { BrandsProps, Category } from '@/types/types'

function isCategory(item: Category | BrandsProps): item is Category {
	return 'imgCarousel' in item
}

export default function TileCard({ item }: { item: Category | BrandsProps }) {
	const divProps = isCategory(item)
		? { className: 'w-[80px] h-[80px]' }
		: { className: 'w-[120px] h-[46px]' }

	return (
		<Card className='flex flex-col gap-6 items-center justify-center h-[190px] w-[220px] rounded-md border bg-base-dark border-gray-400'>
			<CardContent className='flex flex-col gap-6 items-center'>
				<div className={clsx('relative', divProps.className)}>
					{item.image && (
						<Image
							fill={true}
							src={item.image}
							alt={''}
							className='object-contain'
						/>
					)}
				</div>
				<Heading
					Tag='h4'
					size='xs'
					className='text-neutral-900'
				>
					{item.name}
				</Heading>
			</CardContent>
		</Card>
	)
}
