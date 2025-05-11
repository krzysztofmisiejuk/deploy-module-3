import {
	AddressType,
	OrderType,
	OrderWithItems,
	ProductInCart,
	User,
} from '@/types/types'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['query'],
	})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getUsers() {
	return await prisma.user.findMany()
}
export async function getProducts() {
	return await prisma.product.findMany()
}
export async function getCategories() {
	return await prisma.category.findMany()
}
export async function getBrands() {
	return await prisma.brand.findMany()
}
export async function getOrders() {
	return await prisma.order.findMany()
}

export async function createUser(user: User) {
	return await prisma.user.create({
		data: {
			firstName: user.name,
			email: user.email,
			passwordHash: user.password,
			mobileNumber: user.mobileNumber,
			image: user.image,
		},
	})
}

export async function getUserById(userId: number) {
	return await prisma.user.findFirst({
		where: { id: userId },
	})
}
export async function getProductById(productId: number) {
	return await prisma.product.findFirst({
		where: { id: productId },
	})
}
export async function getCategoryById(categoryId: number) {
	return await prisma.category.findFirst({
		where: { id: categoryId },
	})
}
export async function getBrandById(brandId: number) {
	return await prisma.brand.findFirst({
		where: { id: brandId },
	})
}

export async function getUserByEmail(email: string) {
	return await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive',
			},
		},
	})
}
export async function getUserByMobileNumber(mobileNumber: string) {
	return await prisma.user.findFirst({
		where: { mobileNumber },
	})
}
export async function getUserByUsername(username: string) {
	return await prisma.user.findFirst({
		where: { firstName: username },
	})
}

export async function getProductsByCategory(categoryName: string) {
	return await prisma.product.findMany({
		where: {
			categoryName: {
				equals: categoryName,
				mode: 'insensitive',
			},
		},
	})
}

export async function getProductsByBrand(brandName: string) {
	return await prisma.product.findMany({
		where: {
			brandName: {
				equals: brandName,
				mode: 'insensitive',
			},
		},
	})
}

export async function getProductsWithMinPrice(minPrice: number) {
	return await prisma.product.findMany({
		where: {
			price: {
				gte: minPrice,
			},
		},
	})
}

export async function getProductsWithMaxPrice(maxPrice: number) {
	return await prisma.product.findMany({
		where: {
			price: {
				lte: maxPrice,
			},
		},
	})
}

export async function getAddresses() {
	return await prisma.address.findMany()
}

export async function getAddressByUserId(userId: number) {
	return await prisma.address.findMany({
		where: { userId },
	})
}

export async function createAddress(userId: number, addressData: AddressType) {
	return await prisma.address.create({
		data: {
			street: addressData.street,
			city: addressData.city,
			zipCode: addressData.zipCode,
			country: addressData.country,
			province: addressData.province,
			isMainAddress: addressData.isMainAddress,
			userId: userId,
		},
	})
}

export async function resetMainAddress(userId: number) {
	return await prisma.address.updateMany({
		where: { userId },
		data: { isMainAddress: false },
	})
}

export async function createOrder(
	userId: number,
	items: ProductInCart[],
	orderNumber: string
) {
	for (const item of items) {
		const product = await prisma.product.findUnique({
			where: { id: item.id },
			select: { stock: true, name: true },
		})

		if (!product) {
			throw new Error(`Product not found`)
		}

		await prisma.product.update({
			where: { id: item.id },
			data: {
				stock: {
					decrement: item.quantity,
				},
			},
		})
	}

	const productTotal = items.reduce((acc, item) => {
		return acc + item.price * item.quantity
	}, 0)

	const protectionTotal = items.reduce((acc, item) => {
		return acc + (item.hasProtection ? 1 : 0)
	}, 0)

	const deliveryFee = 5
	const insuranceFee = 6
	const totalAmount =
		productTotal + protectionTotal + deliveryFee + insuranceFee

	return await prisma.order.create({
		data: {
			orderNumber,
			userId,
			status: 'SUCCESS',
			totalAmount,
			createdAt: new Date(),
			items: {
				create: items.map((item) => ({
					productId: item.id,
					quantity: item.quantity,
					priceAtPurchase: item.price + (item.hasProtection ? 1 : 0),
					color: item.color,
					hasProtection: item.hasProtection,
				})),
			},
		},
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})
}

export async function getOrderLength() {
	return await prisma.order.count()
}

export function getOrderById(id: number) {
	return prisma.order.findFirst({
		where: { id },
	})
}

export async function getOrdersByUserId(userId: number): Promise<OrderType[]> {
	const orders = await prisma.order.findMany({
		where: { userId },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return orders.map((order: OrderWithItems) => ({
		id: order.id,
		orderNumber: order.orderNumber,
		userId: order.userId,
		createdAt: order.createdAt.toString(),
		status: order.status,
		totalAmount: order.totalAmount,
		products: order.items.map(
			(item): ProductInCart => ({
				...item.product,
				quantity: item.quantity,
				price: item.priceAtPurchase,
				hasProtection: item.hasProtection,
				isSelected: true,
				color: item.color,
			})
		),
	}))
}
