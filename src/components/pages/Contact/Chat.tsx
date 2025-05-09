'use client'
import { useState } from 'react'
import { getCompletion } from '@/server-action/getCompletion'
import { Button, Heading, Input } from '@/components'

interface Message {
	role: 'user' | 'assistant'
	content: string
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState<string>('')

	async function onClick() {
		const completions = await getCompletion([
			...messages,
			{ role: 'user', content: message },
		])
		setMessage('')
		setMessages(completions.messages)
	}

	return (
		<div className='flex flex-col gap-4 w-full flex-1 py-5'>
			<Heading
				Tag='h3'
				className='text-neutral-900'
				weight='medium'
			>
				{' '}
				AI Shop Advisor
			</Heading>
			<div className='flex flex-col items-center w-full flex-1 border-t border-b border-gray-200'>
				<div className='flex flex-col w-full  min-h-[calc(60vh)] overflow-y-auto px-4'>
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`my-2.5 flex flex-col ${
								msg.role === 'user' ? 'items-end' : 'items-start'
							}`}
						>
							<div
								className={`${
									msg.role === 'user'
										? 'bg-base-gray-bg text-neutral-900'
										: 'bg-base-dark text-primary-300'
								} rounded-md py-2 px-8 `}
							>
								{msg.content}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-4 md:flex-row w-full'>
				<div className='w-full min-w-10/12'>
					<Input
						id='new_message'
						placeholder='Ask a question...'
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
						onKeyUp={(e) => {
							if (e.key === 'Enter') onClick()
						}}
					/>
				</div>

				<Button
					onClick={onClick}
					className='text-base bg-custom-dark-gray max-w-'
				>
					Send
				</Button>
			</div>
		</div>
	)
}
