'use client'
import { Product } from '@/types/types'
import { createContext } from 'react'

export const ProductContext = createContext<Product[]>([])

export function ProductsProvider({
	children,
	products,
}: {
	children: React.ReactNode
	products: Product[] 
}) {
	return (
		<ProductContext.Provider value={products}>{children}</ProductContext.Provider>
	)
}
