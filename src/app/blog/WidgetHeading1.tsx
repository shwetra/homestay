import { CustomLink } from '@/data/types'
import React, { FC } from 'react'

export interface WidgetHeading1Props {
	className?: string
	title: string
	viewAll: CustomLink
}

const WidgetHeading1: FC<WidgetHeading1Props> = ({
	className = '',
	title,
	viewAll,
}) => {
	return (
		<div
			className={`nc-WidgetHeading1 flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700 xl:p-5 ${className}`}
		>
			<h2 className="flex-grow text-lg font-semibold text-neutral-900 dark:text-neutral-100">
				{title}
			</h2>
			{!!viewAll.href && (
				<div className="block flex-shrink-0 text-sm font-semibold text-primary-700 dark:text-primary-500">
					{viewAll.label}
				</div>
			)}
		</div>
	)
}

export default WidgetHeading1
