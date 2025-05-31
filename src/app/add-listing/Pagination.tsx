'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from 'next'
import { usePathname } from 'next/navigation'
import React from 'react'

const Pagination = () => {
	const pathname = usePathname() as string

	// get the number from the end of pathname
	const index = pathname.match(/\d+$/)
		? parseInt(pathname.match(/\d+$/)?.[0] || '1')
		: 1

	const nextHref = (
		index < 10 ? `/add-listing/${index + 1}` : `/add-listing/${1}`
	) as Route
	const backtHref = (
		index > 1 ? `/add-listing/${index - 1}` : `/add-listing/${1}`
	) as Route
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'

	return (
		<div className='flex justify-between items-center flex-wrap'>
			<div className="flex justify-end space-x-5">
				<ButtonSecondary >Skip</ButtonSecondary>
				<ButtonPrimary>Save and exit</ButtonPrimary>
			</div>
			<div className="flex justify-start space-x-5">
				<ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
				<ButtonPrimary href={nextHref}>{nextBtnText || 'Continue'}</ButtonPrimary>
			</div>
		</div>
	)
}

export default Pagination
