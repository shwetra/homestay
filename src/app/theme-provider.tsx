'use client'

import { APIProvider } from '@vis.gl/react-google-maps'

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
			{children}
		</APIProvider>
	)
}
