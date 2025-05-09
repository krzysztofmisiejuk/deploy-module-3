'use client'
import { Heading, Card, CardContent } from '@/components'
import { BrandsProps, Category } from '@/types/types'

export default function TileCard({ item }: { item: Category | BrandsProps }) {
	return (
		<Card className='flex flex-col gap-6 items-center justify-center h-[190px] w-[220px] rounded-md border bg-base-dark border-gray-400'>
			<CardContent className='flex flex-col gap-6 items-center'>
				{item?.image && (
					<img
						src={item.image}
						alt={item.name}
					/>
				)}
				<Heading
					Tag='h4'
					size='xs'
					className='text-neutral-900'
				>
					{item?.name}
				</Heading>
			</CardContent>
		</Card>
	)
}
