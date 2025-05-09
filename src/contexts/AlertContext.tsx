'use client'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type AlertContextType = [
	AlertObject,
	Dispatch<SetStateAction<AlertObject>>
]

export type AlertObject = {
	text: string
	type: 'success' | 'error' | 'info'
}

export const AlertContext = createContext<AlertContextType>([
	{ text: '', type: 'info' },
	() => {},
])

export function AlertProvider({ children }: { children: React.ReactNode }) {
	const [alert, setAlert] = useState<AlertObject>({
		text: '',
		type: 'info',
	})

	return (
		<AlertContext.Provider value={[alert, setAlert]}>
			{children}
		</AlertContext.Provider>
	)
}
