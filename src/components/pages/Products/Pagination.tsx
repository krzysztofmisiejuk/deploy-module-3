'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, ArrowLeft, ArrowRight } from '@/components'

interface PaginationProps {
	currentPage: number
	totalPages: number
	isNoProdusts: boolean
}

export default function Pagination({
	currentPage,
	totalPages,
	isNoProdusts,
}: PaginationProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > totalPages) return

		const params = new URLSearchParams(Array.from(searchParams.entries()))
		params.set('page', newPage.toString())
		router.push(`?${params.toString()}`)
	}

	return (
		<div className='flex justify-between items-center gap-2 mt-8 flex-wrap'>
			<div className='flex gap-2'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
					if (totalPages > 5 && page > 5 && page !== currentPage) return null

					return (
						<Button
							variant={`${page === currentPage ? 'fill' : 'textPagination'}`}
							key={page}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</Button>
					)
				})}
			</div>
			<div className='flex gap-8'>
				<Button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1 || isNoProdusts}
					iconLeft={<ArrowLeft fill='#FCFCFC' />}
					variant='strokePagination'
					size='md'
				>
					Previous
				</Button>

				<Button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages || isNoProdusts}
					iconRight={<ArrowRight fill='#FCFCFC' />}
					variant='strokePagination'
					size='md'
				>
					Next
				</Button>
			</div>
		</div>
	)
}
