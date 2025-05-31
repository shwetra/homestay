'use client'

import React, { FC, ReactNode } from 'react'
import twFocusClass from '@/utils/twFocusClass'

export interface NavItemProps {
	className?: string
	radius?: string
	onClick?: () => void
	isActive?: boolean
	renderX?: ReactNode
	children?: ReactNode
}

const NavItem: FC<NavItemProps> = ({
	className = 'px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize',
	radius = 'rounded-full',
	children,
	onClick = () => {},
	isActive = false,
	renderX,
}) => {
	return (
		<li className="nc-NavItem relative" data-nc-id="NavItem">
			{renderX && renderX}
			<button
				className={`block whitespace-nowrap font-medium !leading-none ${className} ${radius} ${
					isActive
						? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
						: 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
				} ${twFocusClass()}`}
				onClick={() => {
					onClick && onClick()
				}}
			>
				{children}
			</button>
		</li>
	)
}

export default NavItem
