import React from 'react'
import { FC } from 'react'
import Pagination from './Pagination'
import PageHeading from './PageHeading'

export interface CommonLayoutProps {
	children: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
	return (
		<div
			className={`nc-PageAddListing1 mx-auto max-w-3xl px-4 pb-24 pt-14 sm:py-4 lg:pb-32`}
		>
			<div className="space-y-4">
				{/* <PageHeading /> */}

				{/* --------------------- */}
				<div className="listingSection__wrap">{children}</div>

				{/* --------------------- */}
				<Pagination />
			</div>
		</div>
	)
}

export default CommonLayout
