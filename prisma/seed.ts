import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
	await prisma.brand.createMany({
		data: [
			{ name: 'Rog', image: 'https://i.ibb.co/Q0gPH1V/ROG-Logo.png' },
			{
				name: 'Logitech',
				image: 'https://i.ibb.co/8LZmbRh4/Logitech-Logo.png',
			},
			{ name: 'JBL', image: 'https://i.ibb.co/93q5dHHj/JBL-Logo.png' },
			{ name: 'AOC', image: 'https://i.ibb.co/ymmv9Xb4/AOC-Logo.png' },
			{ name: 'Razer', image: 'https://i.ibb.co/NnJmyHVK/Razer-Logo.png' },
			{ name: 'Rexus', image: 'https://i.ibb.co/bjtgtnkB/Rexus-Logo.png' },
		],
	})

	await prisma.category.createMany({
		data: [
			{
				name: 'Mouse',
				image: 'https://i.ibb.co/GQ9TZHzx/mouse-icon.png',
				imgCarousel: 'https://i.ibb.co/LdfTdSbg/mouse-img.png',
				description:
					'Discover precision-engineered mice designed for comfort, speed, and performance in both gaming and professional use.',
				exploreInfo:
					'Our collection features ergonomic shapes, customizable buttons, and high-DPI sensors for unmatched productivity and gaming control.',
			},
			{
				name: 'Monitor',
				image: 'https://i.ibb.co/PvSSH6dg/monitor-icon.png',
				imgCarousel: 'https://i.ibb.co/9mrrYhQK/monitor-carousel.png',
				description:
					'Immerse yourself in ultra-clear visuals with monitors tailored for gamers, designers, and everyday multitaskers alike.',
				exploreInfo:
					'Enjoy vibrant colors, fast refresh rates, and eye-care technology for a smooth and comfortable viewing experience all day.',
			},
			{
				name: 'Headphone',
				image: 'https://i.ibb.co/PZTY5cGV/headphones-icon.png',
				imgCarousel: 'https://i.ibb.co/RTrhys4b/headphones-carousel.png',
				description:
					'Explore headphones with premium audio fidelity, deep bass, and noise-cancelling features for immersive listening sessions.',
				exploreInfo:
					'Built for audiophiles and everyday users, our headphones combine sleek design with long battery life and comfort.',
			},
			{
				name: 'Keyboard',
				image: 'https://i.ibb.co/jkT9Jf2S/keyboard-icon.png',
				imgCarousel: 'https://i.ibb.co/7dxcdsJx/keyboard-crousel.png',
				description:
					'Find the perfect keyboard with tactile feedback, RGB lighting, and layouts suited for gaming or productive workflows.',
				exploreInfo:
					'Designed with precision switches and ergonomic builds, our keyboards elevate every keystroke to a premium experience.',
			},
			{
				name: 'Webcam',
				image: 'https://i.ibb.co/hFHBS0D7/camera-icon.png',
				imgCarousel: 'https://i.ibb.co/6RTJWXhF/webcam-carousel.png',
				description:
					'Connect in crystal clarity with webcams offering HD video, auto-focus, and low-light correction for virtual meetings.',
				exploreInfo:
					'Perfect for streamers or professionals, these webcams provide sharp visuals and clear audio in any lighting condition.',
			},
		],
	})

	const passwordHash = await bcrypt.hash('Password123!', 10)

	for (let i = 1; i <= 5; i++) {
		const user = await prisma.user.create({
			data: {
				firstName: `User${i}`,
				email: `user${i}@email.com`,
				passwordHash,
				mobileNumber: `12345678${i}`,
				image: 'https://i.ibb.co/8LvhXrNh/profile-Img.png',
			},
		})

		await prisma.address.create({
			data: {
				street: `Puławska ${i}`,
				city: 'Warsaw',
				zipCode: '02-595',
				country: 'Poland',
				province: 'Masovian',
				userId: user.id,
				isMainAddress: true,
			},
		})
	}

	const allCategories = await prisma.category.findMany()
	const allBrands = await prisma.brand.findMany()

	const imageMap: Record<string, string> = {
		Mouse: 'https://i.ibb.co/W4LZvvSc/mouse-card.png',
		Monitor: 'https://i.ibb.co/HTgqJJkJ/monitor.png',
		Headphone: 'https://i.ibb.co/sdwf7S6C/headphones.png',
		Keyboard: 'https://i.ibb.co/5xXF2grX/keyboard.png',
		Webcam: 'https://i.ibb.co/wNrFxf18/camera-1219748-640.png',
	}

	const productDescriptions = [
		"Optimized for fast response and long-lasting comfort, this product is built to handle intense daily use without compromising on style or performance. Whether you're working or gaming, it delivers consistent, high-level reliability.",
		'Crafted with high-end materials and an intelligent design, this device seamlessly blends durability with everyday practicality. It`s perfect for professionals who demand efficiency without sacrificing aesthetic appeal.',
		'Engineered for users who need both power and precision, this lightweight tool delivers exceptional performance. Its compact form hides a robust core that ensures smooth operation in any setting, from workspaces to gaming setups.',
		'Combining a sleek, modern look with cutting-edge functionality, this product is ideal for those who value both performance and presentation. Expect fast, fluid responsiveness paired with premium build quality.',
		"With a focus on durability and consistent top-tier results, this product is made to withstand the demands of daily use. Whether you're pushing limits or cruising through your day, it delivers dependable performance every time.",
	]
	const models = ['Pro GM5', 'IPS', 'TL', 'XTI', 'HD ']

	let productCount = 1

	for (const category of allCategories) {
		for (let i = 0; i < allCategories.length; i++) {
			const brand = allBrands[(productCount + i) % allBrands.length]
			const discount =
				i === 0 ? 59.99 + +Math.floor(Math.random() * 5).toFixed() : null

			await prisma.product.create({
				data: {
					name: `${category.name} ${models[category.id - 1]}${
						(i + 1) * +Math.floor(Math.random() * 100).toFixed()
					}`,
					description: productDescriptions[i % productDescriptions.length],
					price: 89.99 + i + +Math.floor(Math.random() * 50).toFixed(),
					stock: 50,
					discount: discount ?? undefined,
					imageUrl: imageMap[category.name],
					categoryId: category.id,
					brandId: brand.id,
					categoryName: category.name,
					brandName: brand.name,
				},
			})

			productCount++
		}
	}
}

main()
	.then(async () => await prisma.$disconnect())
	.catch((e) => {
		console.error('Seed error:', e)
		process.exit(1)
	})
