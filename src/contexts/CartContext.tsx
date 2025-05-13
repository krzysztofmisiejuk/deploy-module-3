'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { ProductInCart } from '@/types/types'
import { loadCart } from '@/lib/cartActions'

interface CartContextType {
	productList: ProductInCart[]
	setProductList: (products: ProductInCart[]) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
	const [productList, setProductList] = useState<ProductInCart[]>([])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const cart = loadCart()
			setProductList(cart)
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(productList))
		}
	}, [productList])

	return (
		<CartContext.Provider value={{ productList, setProductList }}>
			{children}
		</CartContext.Provider>
	)
}
