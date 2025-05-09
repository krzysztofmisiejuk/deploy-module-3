import { ContactInfo, ContactUs } from '@/components'
export default function ContactUsPage() {
	return (
		<div className='flex flex-col py-10 gap-6 w-full h-full '>
			<ContactUs />
			<ContactInfo />
		</div>
	)
}
