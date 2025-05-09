'use client'
import { useEffect, useContext } from 'react'
import clsx from 'clsx'
import { AlertContext } from '@/contexts/AlertContext'
import { CrossIcon, CheckCircle, CrossCircle, InfoCircle } from '@/components'

export default function Alert() {
	const [alert, setAlert] = useContext(AlertContext)

	useEffect(() => {
		if (alert.text) {
			const timer = setTimeout(() => {
				setAlert({ text: '', type: 'info' })
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [alert, setAlert])

	if (!alert.text) return null

	const styles = {
		success: {
			bg: 'bg-success-50',
			border: 'border border-success-400',
			icon: <CheckCircle />,
		},
		error: {
			bg: 'bg-danger-400',
			border: 'border border-danger-50',
			icon: <CrossCircle />,
		},
		info: {
			bg: 'bg-blue-200',
			border: 'border border-blue-400',
			icon: <InfoCircle />,
		},
	}

	const current = styles[alert.type]

	return (
		<div className='flex px-10 py-3 gap-4'>
			<div
				className={clsx(
					'flex items-center gap-4 w-full p-3 lg:p-4 text-base lg:text-xl text-neutral-900 rounded',
					current.bg,
					current.border
				)}
			>
				{current.icon}
				<p className='flex-1 font-medium'>{alert.text}</p>
				<button
					className='cursor-pointer'
					onClick={() => setAlert({ text: '', type: 'info' })}
					aria-label='Close alert'
				>
					<CrossIcon />
				</button>
			</div>
		</div>
	)
}
