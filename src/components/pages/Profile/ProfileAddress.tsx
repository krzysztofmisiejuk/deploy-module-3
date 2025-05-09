import { HomeIcon, Paragraph } from '@/components'
import { capitalize } from '@/lib/utils'
import { AddressType } from '@/types/types'

export default function ProfileAddress({ address }: { address: AddressType }) {
	const isMainAddress = address.isMainAddress === true
	return (
		<div className='flex flex-col gap-4 p-4 bg-base-dark border border-gray-200 rounded-md w-full'>
			<div className='flex gap-4'>
				<HomeIcon fill='#F29145' />
				<Paragraph className='text-neutral-900'>
					{isMainAddress ? 'Main Address' : 'Additional Address'}
				</Paragraph>
			</div>
			<div className='flex flex-col pl-10 text-neutral-600'>
				<Paragraph>Country: {capitalize(address.country)}</Paragraph>
				<Paragraph>Province: {capitalize(address.province)}</Paragraph>
				<Paragraph>City: {capitalize(address.city)}</Paragraph>
				<Paragraph>Zip: {capitalize(address.zipCode)}</Paragraph>
				<Paragraph>Street: {capitalize(address.street)}</Paragraph>
			</div>
		</div>
	)
}
