'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AlertContext } from '@/contexts'
import { AddressType } from '@/types/types'
import { newAdressSchema } from '@/schemas/newAdressSchema'
import { Button, Form } from '@/components'
import { NewAddressSelect, NewAddressTextarea, NewAddressCheckbox } from './'
import {
	cityOptions,
	countryOptions,
	postalCodeOptions,
	provinceOptions,
} from '@/data/newAdressData'

type NewAdressData = z.infer<typeof newAdressSchema>

export default function NewAddress() {
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	async function updateAddress(data: AddressType) {
		try {
			const response = await fetch('http://localhost:3000/api/address', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					country: data.country,
					province: data.province,
					city: data.city,
					zipCode: data.zipCode,
					street: data.street,
					isMainAddress: data.isMainAddress,
				}),
				cache: 'no-store',
			})
			const updatedAdress = await response.json()
			if (response.ok) {
				setAlert({ text: `${updatedAdress.message}`, type: 'success' })
			} else {
				setAlert({ text: `${updatedAdress.error}`, type: 'error' })
			}
		} catch (error) {
			console.error(error)
		}
	}

	function onSubmit(data: AddressType) {
		updateAddress(data)
		router.push('/checkout')
		router.refresh()
	}

	const form = useForm<NewAdressData>({
		resolver: zodResolver(newAdressSchema),
		defaultValues: {
			country: '',
			province: '',
			city: '',
			zipCode: '',
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
							placeholder='Select your country'
							options={countryOptions}
						/>
						<NewAddressSelect
							form={form}
							name='province'
							placeholder='Province'
							options={provinceOptions}
						/>
					</div>
					<div className='flex flex-col sm:flex-row justify-between gap-10'>
						<NewAddressSelect
							form={form}
							name='city'
							placeholder='City'
							options={cityOptions}
						/>
						<NewAddressSelect
							form={form}
							name='zipCode'
							placeholder='Postal code'
							options={postalCodeOptions}
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
