export default function FormWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col gap-8 p-6 w-full max-w-md border border-gray-200 rounded-md bg-base-dark'>
			{children}
		</div>
	)
}
