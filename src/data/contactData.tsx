import {
	FacebookIcon,
	HomeIcon,
	InstagramIcon,
	LinkedInIcon,
	MailIcon,
	PhoneIcon,
} from '@/components'
import { ContactDataType } from '@/types/types'

export const contactData: ContactDataType[] = [
	{
		title: 'Our Location',
		description: 'Pulawska 1, 00-001 Warsaw, Masovian, Poland',
		link: 'Visit Us',
		icons: [<HomeIcon key='home' />],
	},
	{
		title: 'Email Us',
		description:
			'Through email you can submit complaints and also suggestions to us, please contact',
		link: 'devstockHub@contact.com',
		icons: [<MailIcon key='mail' />],
	},
	{
		title: 'Mobile Chat',
		description: 'We can also be reached using Whatsapp and calling.',
		link: '+48 123 456 789',
		icons: [<PhoneIcon key='phone' />],
	},
	{
		title: 'Social Media',
		description: 'You can also find on the most popular social media',
		link: "Let's explore",
		icons: [
			<FacebookIcon key='facebook' />,
			<InstagramIcon key='instagram ' />,
			<LinkedInIcon key='linkedin' />,
		],
	},
]
