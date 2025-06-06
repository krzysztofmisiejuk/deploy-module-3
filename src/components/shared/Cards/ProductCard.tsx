'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { AlertContext, CartContext } from '@/contexts'
import { ProductInCart } from '@/types/types'
import Image from 'next/image'
import { updateCartQuantity } from '@/lib/cartActions'
import {
  CartIcon,
  Heading,
  Paragraph,
  Card,
  CardContent,
  CardHeader,
  Badge,
} from '@/components'

type ProductCardProps = {
  product: ProductInCart
}

export default function ProductCard({ product }: ProductCardProps) {
  const { productList, setProductList } = useContext(CartContext)!
  const [, setAlert] = useContext(AlertContext)

  const handleAddToCart = (product: ProductInCart, event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const productColor = product.color || 'default'

    const existingProduct = productList.find(
      (item) => item.id === product.id && item.color === productColor
    )

    if (existingProduct) {
      updateCartQuantity({
        productId: product.id,
        newQuantity: existingProduct.quantity + 1,
        productList,
        setProductList,
      })
    } else {
      const newProduct: ProductInCart = {
        ...product,
        quantity: 1,
        hasProtection: true,
        isSelected: true,
        color: productColor,
      }
      setProductList([...productList, newProduct])
    }

    setAlert({
      text: `${product.brandName} ${product.name} added to cart successfully!`,
      type: 'success',
    })
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className='flex flex-col gap-4.5 px-3 pt-3 pb-5 w-[300px] rounded-md bg-base-dark border border-gray-200 cursor-pointer'>
        <CardHeader className='min-h-[204px] p-0'>
          <div className='relative w-full min-h-[204px] rounded-md px-0 bg-white'>
            <button
              aria-label='Add to cart'
              className='absolute p-1 top-3 left-3 bg-base-dark rounded-md cursor-pointer z-10 opacity-70 hover:opacity-100'
              onClick={(e) => handleAddToCart(product, e)}
            >
              <CartIcon />
            </button>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                layout='fill'
                objectFit='contain'
                alt={product.name}
                className='rounded-md'
              />
            )}
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 text-neutral-900'>
          <Badge>{product.categoryName}</Badge>
          <div className='flex flex-col gap-2'>
            <Paragraph
              size='lg'
              weight='regular'
            >
              {product?.brandName} {product.name}
            </Paragraph>
            <Heading
              size='md'
              weight='semibold'
              Tag='h5'
              className='flex items-center gap-2.5'
            >
              ${product.discount ? product.discount : product.price}
              {product.discount && (
                <span className='text-neutral-600 font-normal text-lg line-through'>
                  ${product.price}
                </span>
              )}
            </Heading>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}