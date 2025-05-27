'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AlertContext } from '@/contexts'
import { AddressType } from '@/types/types'

import { Button, Form } from '@/components'
import { NewAddressSelect, NewAddressTextarea, NewAddressCheckbox } from './'
import { countryOptions } from '@/data/newAdressData'
import { createNewAddress } from '@/lib/addressActions'
import { newAdressSchema } from '@/schemas/newAdressSchema'
import { NewAddressInput } from './NewAddressInput'

type NewAdressData = z.infer<typeof newAdressSchema>

export default function NewAddress() {
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	async function onSubmit(data: AddressType) {
		const response = await createNewAddress(data)

		if (response.error) {
			setAlert({ text: response.error, type: 'error' })
		} else {
			setAlert({
				text: response.message ?? 'Address added successfully',
				type: 'success',
			})
			router.push('/checkout')
		}
	}

	const form = useForm<NewAdressData>({
		resolver: zodResolver(newAdressSchema),
		defaultValues: {
			country: '',
			province: '',
			city: '',
			zipCode: 0,
			street: '',
			isMainAddress: true,
		},
	})

	return (
		<div className='flex flex-col gap-8'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<div className='flex flex-col sm:flex-row justify-between gap-10'>
						<NewAddressSelect
							form={form}
							name='country'
							placeholder='Country'
							options={countryOptions}
						/>
						<NewAddressInput
							form={form}
							name='province'
							placeholder='Province'
						/>
					</div>
					<div className='flex flex-col sm:flex-row justify-between gap-10'>
						<NewAddressInput
							form={form}
							name='city'
							placeholder='City'
						/>
						<NewAddressInput
							form={form}
							name='zipCode'
							placeholder='Zip Code'
						/>
					</div>
					<NewAddressTextarea form={form} />
					<NewAddressCheckbox form={form} />
					<Button type='submit'>Save Address</Button>
				</form>
			</Form>
		</div>
	)
}
