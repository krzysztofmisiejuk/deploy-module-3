'use server'
import { getProducts } from '@/lib/db'
import { Product } from '@/types/types'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

function formatProductList(products: Product[]): string {
	return products
		.map((product) => {
			return `
Name: ${product.name}
Category: ${product.categoryName}
Brand: ${product.brandName}
Description: ${product.description}
Price: ${product.price} $
Discount: ${product.discount ? `${product.discount} $` : 'None'}
Stock: ${product.stock} units
			`.trim()
		})
		.join('\n\n---\n\n')
}

export async function getCompletion(
	messageHistory: {
		role: 'user' | 'assistant'
		content: string
	}[]
) {
	const productList: Product[] = await getProducts()
	const formattedProductList = formatProductList(productList)

	const initialPrompt = {
		role: 'system' as const,
		content: `
You are an assistant in an online store. Your task is to help customers choose the right products based on their questions and needs. Below is a list of products available in the store. Use this list to provide accurate answers by mentioning product details such as name, price, discount, brand, category, and availability. If a customer asks about something that is not on the list, inform them that the product is not available, but suggest alternatives from the list. Respond in a polite, concise, and professional manner.

### Product list:
${formattedProductList}
		`.trim(),
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [initialPrompt, ...messageHistory],
	})

	const messages = [
		...messageHistory,
		response.choices[0].message as {
			role: 'user' | 'assistant'
			content: string
		},
	]

	return { messages }
}
