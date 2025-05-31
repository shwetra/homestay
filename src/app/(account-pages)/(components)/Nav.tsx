'use client'

import { Route } from '@/routers/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Nav = () => {
	const pathname = usePathname()

	const listNav: Route[] = [
		'/account',
		'/account-savelists',
		'/account-password',
		'/account-billing',
	]

	return (
		<div className="container">
			<div className="hiddenScrollbar flex space-x-8 overflow-x-auto md:space-x-14">
				{listNav.map((item) => {
					const isActive = pathname === item
					return (
						<Link
							key={item}
							href={item}
							className={`block flex-shrink-0 border-b-2 py-5 capitalize md:py-8 ${
								isActive
									? 'border-primary-500 font-medium'
									: 'border-transparent'
							}`}
						>
							{item.replace('-', ' ').replace('/', ' ')}
						</Link>
					)
				})}
			</div>
		</div>
	)
}
