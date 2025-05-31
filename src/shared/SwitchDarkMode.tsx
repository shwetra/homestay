'use client'

import React from 'react'
import { MoonIcon } from '@heroicons/react/24/solid'
import { SunIcon } from '@heroicons/react/24/outline'
import { useThemeMode } from '@/utils/useThemeMode'
export interface SwitchDarkModeProps {
	className?: string
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = '' }) => {
	const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode()

	return (
		<button
			onClick={_toogleDarkMode}
			className={`flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl ${className}`}
		>
			<span className="sr-only">Enable dark mode</span>
			{isDarkMode ? (
				<MoonIcon className="h-7 w-7" aria-hidden="true" />
			) : (
				<SunIcon className="h-7 w-7" aria-hidden="true" />
			)}
		</button>
	)
}

export default SwitchDarkMode
