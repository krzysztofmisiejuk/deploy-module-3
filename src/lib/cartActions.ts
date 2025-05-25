import { ProductInCart } from '@/types/types'

interface handleQuantityChangeProps {
	newQuantity: number
	product: ProductInCart | { id: number; stock: number }
	setQuantity: (quantity: number) => void
	updateQuantity?: (productId: number, newQuantity: number) => void
	setAlert: (alert: { text: string; type: 'success' | 'error' }) => void
}

export function loadCart(): ProductInCart[] {
	const products = localStorage.getItem('cart')
	if (products) {
		const parsedProducts: ProductInCart[] = JSON.parse(products)
		const updatedProducts = parsedProducts.map((product) => ({
			...product,
			isSelected: product.isSelected !== undefined ? product.isSelected : true,
			hasProtection:
				product.hasProtection !== undefined ? product.hasProtection : true,
			color: product.color || 'default',
		}))
		localStorage.setItem('cart', JSON.stringify(updatedProducts))
		return updatedProducts
	}
	return []
}

export function saveCart(cart: ProductInCart[]) {
	localStorage.setItem('cart', JSON.stringify(cart))
}

export function clearCart(setProductList: (products: ProductInCart[]) => void) {
	localStorage.removeItem('cart')
	setProductList([])
}

export function handleQuantityChange({
	newQuantity,
	product,
	setQuantity,
	updateQuantity,
	setAlert,
}: handleQuantityChangeProps) {
	if (newQuantity > product.stock) {
		setAlert({
			text: 'Cannot select more than available stock',
			type: 'error',
		})
		return
	}
	if (newQuantity < 1) {
		setAlert({
			text: 'Quantity cannot be less than 1',
			type: 'error',
		})
		return
	}

	setQuantity(newQuantity)
	if (updateQuantity) {
		updateQuantity(product.id, newQuantity)
	}
}

export function updateCartQuantity({
	productId,
	newQuantity,
	productList,
	setProductList,
}: {
	productId: number
	newQuantity: number
	productList: ProductInCart[]
	setProductList: (products: ProductInCart[]) => void
}) {
	const updatedCart = productList.map((product) =>
		product.id === productId ? { ...product, quantity: newQuantity } : product
	)
	setProductList(updatedCart)
}
