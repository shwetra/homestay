'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const PageHeading = () => {
	const pathname = usePathname()

	// get the number from the end of pathname
	const index = pathname.match(/\d+$/)
		? parseInt(pathname.match(/\d+$/)?.[1] || '1')
		: 1

	return (
		<div>
			<span className="text-4xl font-semibold">{index}</span>
			<span className="text-lg text-neutral-500 dark:text-neutral-400">
				/ 10
			</span>
		</div>
	)
}

export default PageHeading
