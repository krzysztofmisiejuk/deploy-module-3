import { Metadata } from "next";
import { Breadcrumps, Cart } from "@/components";

export const metadata: Metadata = {
	title: 'Cart',
}

export default function CartPage() {
	return (
		<section className='w-full'>
			<Breadcrumps/>
			<Cart/>
		</section>
	)
}
