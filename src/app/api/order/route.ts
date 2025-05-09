import { authOptions } from '@/lib/authOptions'
import { createOrder, getOrders } from '@/lib/db'
import { ProductInCart } from '@/types/types'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const orders = await getOrders()

		if (orders.length === 0) {
			return NextResponse.json({ error: 'Orders not found' }, { status: 404 })
		}
		return NextResponse.json({ orders }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
	  const session = await getServerSession(authOptions);
	  if (!session) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	  }
  
	  const userId = session.user.id;
	  const { data, orderNumber }: { data: ProductInCart[]; orderNumber: string } = await req.json();
  
	  if (!data || data.length === 0) {
		return NextResponse.json({ error: 'Invalid or empty cart data' }, { status: 400 });
	  }
	  if (!orderNumber) {
		return NextResponse.json({ error: 'Order number is required' }, { status: 400 });
	  }
	  if (Number(session.user.id) !== Number(userId)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	  }
  
	  const order = await createOrder(Number(userId), data, orderNumber); 
  
	  return NextResponse.json(
		{
		  message: 'Order completed successfully! Thank you!',
		  orderId: order.id,
		  orderNumber, 
		},
		{ status: 200 }
	  );
	} catch (error) {
	  console.error('Error creating order:', error);
	  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
  }
