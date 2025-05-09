import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getEstimatedArrival(): string {
	const today = new Date()

	const getRandomDate = () => {
		const randomOffset = Math.floor(Math.random() * 7)
		const result = new Date(today)
		result.setDate(today.getDate() + randomOffset)
		return result
	}

	const date1 = getRandomDate()
	const date2 = getRandomDate()

	const [start, end] = [date1, date2].sort((a, b) => a.getTime() - b.getTime())

	const format = (date: Date) =>
		date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
		})

	return `Estimated arrival ${format(start)} – ${format(end)}`
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function generateDateString(date: Date): string {
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear().toString()
	return `${day}${month}${year}`
}

export async function generateOrderId(orderLength: number): Promise<string> {
	const dateStr = generateDateString(new Date())
	const orderNumber = (orderLength + 1).toString().padStart(3, '0')
	return `${dateStr}/${orderNumber}`
}


