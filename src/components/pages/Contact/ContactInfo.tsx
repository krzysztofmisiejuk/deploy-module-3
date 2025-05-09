import ContactInfoItem from './ContactInfoItem'
import { contactData } from '@/data/contactData'

export default function ContactInfo() {
	return (
		<div className='flex flex-col divide-y divide-gray-200'>
			{contactData.map((data, index) => (
				<div
					className='py-8'
					key={index}
				>
					<ContactInfoItem data={data} />
				</div>
			))}
		</div>
	)
}
