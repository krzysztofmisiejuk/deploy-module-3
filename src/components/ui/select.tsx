import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return (
		<SelectPrimitive.Root data-slot='select' {...props} />
	)
}

function SelectTrigger({
	className,
	size = 'md', 
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}) {
	const sizeClass = {
		sm: 'text-xs py-1.5 px-2',
		md: 'text-sm py-2 px-3',
		lg: 'text-sm md:text-base py-2 md:py-3.5 px-4',
		xl: 'text-lg py-4 px-5',
		xxl: 'text-xl py-5 px-6',
	}[size]

	return (
		<SelectPrimitive.Trigger
			data-slot='select-trigger'
			className={cn(
				'border-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-base-dark whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-neutral-900  data-[placeholder]:text-neutral-500 w-full',
				sizeClass,
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className='size-7 opacity-50' />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

function SelectContent({
	className,
	children,
	position = 'popper',
	size = 'md',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & { size?: string }) {
	const sizeClass = {
		sm: 'max-h-32',
		md: 'max-h-48',
		lg: 'max-h-64',
		xl: 'max-h-80',
		xxl: 'max-h-96',
	}[size]

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot='select-content'
				className={cn(
					'text-neutral-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md bg-base-dark w-[var(--radix-select-trigger-width)]',
					sizeClass,
					className
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport className='p-1'>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

function SelectItem({
	className,
	children,
	size = 'md',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & { size?: string }) {
	const sizeClass = {
		sm: 'py-1 pr-4 pl-2',
		md: 'py-1.5 pr-4 pl-2',
		lg: 'py-2 px-3.5 md:py-4',
		xl: 'py-2.5 pr-6 pl-3',
		xxl: 'py-3 pr-7 pl-4',
	}[size]

	return (
		<SelectPrimitive.Item
			data-slot='select-item'
			className={cn(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full',
				sizeClass,
				className
			)}
			{...props}
		>
			<span className='absolute right-2 flex size-3.5 items-center justify-center'>
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className='size-4' />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot='select-label'
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	)
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot='select-scroll-up-button'
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className
			)}
			{...props}
		>
			<ChevronUpIcon className='size-6' />
		</SelectPrimitive.ScrollUpButton>
	)
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot='select-scroll-down-button'
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className
			)}
			{...props}
		>
			<ChevronDownIcon className='size-6' />
		</SelectPrimitive.ScrollDownButton>
	)
}

function SelectValue({
	className,
	size = 'md',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & { size?: string }) {
	const sizeClass = {
		sm: 'text-xs py-1.5 px-2',
		md: 'text-sm py-2 px-3',
		lg: 'text-base py-3 px-4',
		xl: 'text-lg py-4 px-5',
		xxl: 'text-xl py-5 px-6',
	}[size]

	return (
		<SelectPrimitive.Value
			data-slot='select-value'
			className={cn(
				'text-base-dark data-[placeholder]:text-neutral-500 w-full',
				sizeClass,
				className
			)}
			{...props}
		/>
	)
}

export {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
}
