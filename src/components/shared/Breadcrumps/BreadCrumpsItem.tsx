'use client'
import { usePathname } from 'next/navigation'
import { Product } from '@/types/types'
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components'

function BreadcrumpField({
	route,
	href,
	isLast,
}: {
	route: string
	href: string
	isLast: boolean
}) {
	const breadcrumpName =
		route.charAt(0).toUpperCase() + route.slice(1).toLowerCase()
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href={href}>{breadcrumpName}</BreadcrumbLink>
			</BreadcrumbItem>
			{!isLast && <BreadcrumbSeparator />}
		</>
	)
}

export default function BreadCrumpItems({ products }: { products: Product[] }) {
	// const products: Product[] = useContext(ProductContext)
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)
	const allSegments = ['home', ...segments]

	const isProductPage = /\d+/.test(allSegments[allSegments.length - 1])
	const productId = isProductPage ? segments[1] : null

	const product = productId ? products.find((p) => p.id === +productId) : null

	const productName = product ? `${product.brandName} ${product.name}` : null

	if (productName) {
		allSegments[allSegments.length - 1] = productName
	}

	return (
		<BreadcrumbList>
			{allSegments.map((segment, index) => {
				const href =
					index === 0 ? '/' : '/' + segments.slice(0, index).join('/')
				const isLast = index === allSegments.length - 1

				return (
					<div
						key={href}
						className='flex items-center gap-2'
					>
						<BreadcrumpField
							route={segment}
							href={href}
							isLast={isLast}
						/>
					</div>
				)
			})}
		</BreadcrumbList>
	)
}
