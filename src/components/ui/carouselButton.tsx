import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean
}

function CarouselButton({
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all',
        'bg-primary-500 hover:bg-primary-600 active:bg-primary-400 text-white',
        'h-[74px] w-[44px] rounded-none px-[7px]',
        'disabled:pointer-events-none disabled:cursor-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
        'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer',
        className
      )}
      {...props}
    />
  )
}

export { CarouselButton }