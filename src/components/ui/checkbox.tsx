import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

type Variant = 'default' | 'white' | 'black'

interface CheckboxProps
	extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
	variant?: Variant
}

function Checkbox({ className, variant = 'default', ...props }: CheckboxProps) {
	const variantClasses = {
		default:
			'bg-gray-50 border-gray-400 data-[state=checked]:bg-primary-500 data-[state=checked]:text-base-dark',
		white:
			'bg-white border-white opacity-50 data-[state=checked]:opacity-100 data-[state=checked]:bg-white data-[state=checked]:text-black h-13 w-13',
		black:
			'bg-black border-black opacity-50 data-[state=checked]:opacity-100 data-[state=checked]:bg-black data-[state=checked]:text-white h-13 w-13',
	}

	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer size-6.5 shrink-0 rounded-md border shadow-xs transition-shadow outline-none',
				'focus-visible:border-ring focus-visible:ring-ring/50',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				'disabled:cursor-not-allowed disabled:opacity-50',
				variantClasses[variant],
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='flex items-center justify-center text-current transition-none'
			>
				<CheckIcon className='size-5.5' />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
