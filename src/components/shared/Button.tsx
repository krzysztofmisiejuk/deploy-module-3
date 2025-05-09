import React from 'react'

type Variant =
	| 'fill'
	| 'stroke'
	| 'text'
	| 'strokePagination'
	| 'textPagination'
	| 'quantity'
	| 'underline'
	| "logout"
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
	children?: React.ReactNode
	variant?: Variant
	size?: Size
	disabled?: boolean
	className?: string
	onClick?: () => void
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	type?: ButtonType
}

const baseStyles: Record<Variant, string> = {
	fill: 'text-base-dark font-medium',
	stroke: 'bg-transparent border font-medium',
	text: 'bg-transparent border-0 font-medium',
	strokePagination: 'bg-transparent border font-medium',
	textPagination: 'bg-transparent border-0 font-medium',
	quantity: 'font-medium',
	underline: 'rounded-none',
	logout: "bg-transparent rounded-none"

}

const colorStyles: Record<Variant, string> = {
	fill: 'bg-primary-500 hover:bg-primary-600 active:text-gray-200 disabled:bg-primary-300',
	stroke:
		'text-primary-500 border-primary-500 hover:border-primary-400 active:border-primary-400 active:text-primary-400 disabled:border-primary-300 disabled:text-primary-300',
	text: 'text-primary-500 hover:text-primary-600 active:text-primary-400 disabled:text-primary-300',
	strokePagination:
		'text-neutral-900 hover:border-neutral-500 active:border-border-neutral-600 active:border-neutral-500 disabled:opacity-50',
	textPagination:
		'text-neutral-500 hover:text-primary-600 active:text-primary-400 disabled:text-primary-300',
	quantity: 'text-neutral-900 hover:text-neutral-500 disabled:opacity-30',
	underline:
		'w-1/2 pb-3 pt-0 border-b text-center text-neutral-500 border-gray-200',
	logout:
		'p-0   text-center text-neutral-500 border-gray-200 hover:text-neutral-900',
}

const sizeStyles: Record<Size, string> = {
	xxs: 'text-base px-0 py-0',
	xs: 'text-xs px-5 py-1.5',
	sm: 'text-sm px-5 py-2',
	md: 'text-sm px-5 py-2.5',
	lg: 'text-base px-5 py-3',
	xl: 'text-base px-5 py-2 md:py-3.5',
	xxl: 'text-lg px-5 py-4',
}

export const Button = ({
	children,
	variant = 'fill',
	size = 'md',
	disabled = false,
	className = '',
	onClick,
	iconLeft,
	iconRight,
	type = 'button',
}: ButtonProps) => {
	const classes = `
		inline-flex items-center justify-center rounded-md transition-all
		${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
		${baseStyles[variant]}
		${colorStyles[variant]}
		${sizeStyles[size]}
		${className}
	`

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
		>
			{iconLeft && <span className='mr-2'>{iconLeft}</span>}
			{children}
			{iconRight && <span className='ml-2'>{iconRight}</span>}
		</button>
	)
}

export default Button
