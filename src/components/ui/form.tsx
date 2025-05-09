'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState } = useFormContext()
	const formState = useFormState({ name: fieldContext.name })
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot='form-item'
				className={cn('flex flex-col gap-4', className)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { formItemId } = useFormField()

	return (
		<Label
			data-slot='form-label'
			className={cn(
				'data-[error=true]:text-destructive text-lg leading-[28px] font-medium text-neutral-900',
				className
			)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			data-slot='form-control'
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
	const { error, formDescriptionId } = useFormField()

	if (error) return null

	return (
		<p
			data-slot='form-description'
			id={formDescriptionId}
			className={cn('text-neutral-600 font-normal text-sm', className)}
			{...props}
		/>
	)
}
type FormMessageProps = React.ComponentProps<'p'> & {
	variant?: 'error' | 'success' | 'info'
}

function FormMessage({ className, variant, ...props }: FormMessageProps) {
	const { error, formMessageId } = useFormField()
	const hasError = !!error
	const body = hasError ? String(error?.message ?? '') : props.children

	if (!body) return null

	const baseStyle = 'text-sm'
	const variantStyles = {
		error: 'text-danger-400 border-danger-600',
		success: 'text-neutral-500',
		info: 'text-neutral-500',
	}

	const appliedStyle = variant
		? variantStyles[variant]
		: hasError
		? variantStyles.error
		: ''

	return (
		<p
			data-slot='form-message'
			id={formMessageId}
			className={cn(baseStyle, appliedStyle, className)}
			{...props}
		>
			{body}
		</p>
	)
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
}
