import { JSX } from 'react'

export interface JWT {
	id: string
	email: string
	name: string
	image: string
}

export interface Session {
	user: {
		id: string
		email: string
		name: string
		image: string
	}
}

export interface IconsProps {
	width?: string
	height?: string
	fill?: string
	className?: string
}

export interface User {
	id?: number
	name: string
	email: string
	password: string
	mobileNumber: string
	image?: string
	address?: string
}

export type Category = {
	id: number
	name: string
	description?: string | null
	image?: string | null
	imgCarousel: string 
	exploreInfo?: string | null
}

export interface BrandsProps {
	id: number
	name: string
	image: string | null
}

export interface Product {
	id: number
	name: string
	description: string
	price: number
	discount?: number | null
	stock: number
	imageUrl: string | null
	categoryId: number
	brandId: number
	createdAt: string | Date
	updatedAt: string | Date
	categoryName: string
	brandName: string
}

export interface ProductInCart extends Product {
	quantity: number
	hasProtection: boolean
	isSelected: boolean
	color: string
}

export interface OrderType {
	id: number
	orderNumber: string
	userId: number
	createdAt: string
	status: string
	totalAmount: number
	products: ProductInCart[]
}

export interface OrderItemType {
	id: number
	orderId: number
	productId: number
	quantity: number
	priceAtPurchase: number
	color: string
	hasProtection: boolean
	product: Product
}

export type CheckboxFieldProps = {
	id: string
	defaultChecked?: boolean
	checked?: boolean
	onChange: (checked: boolean) => void
	labelText: React.ReactNode | string
}

export interface CategoriesProps {
	id: number
	name: string
	description: string | null
	image: string | null
	imgCarousel: string | null
	exploreInfo: string | null
}

export interface AddressType {
	id?: number
	street: string
	city: string
	zipCode: number
	province: string
	country: string
	isMainAddress?: boolean
	userId?: number
}

export interface ProductDetailParamProps {
	params: Promise<{ id: string }>
}

export interface ContactDataType {
	title: string
	description: string
	link: string
	icons: JSX.Element[]
}

export interface NewAddessData {
	value: string
	label: string
}

export type OrderWithItems = {
  id: number;
  orderNumber: string;
  userId: number;
  createdAt: Date | string;
  status: string;
  totalAmount: number;
  items: OrderItemType[];
};