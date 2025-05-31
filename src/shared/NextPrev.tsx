'use client'

import React, { FC } from 'react'
import twFocusClass from '@/utils/twFocusClass'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export interface NextPrevProps {
	className?: string
	currentPage?: number
	totalPage?: number
	btnClassName?: string
	onClickNext?: () => void
	onClickPrev?: () => void
	onlyNext?: boolean
	onlyPrev?: boolean
}

const NextPrev: FC<NextPrevProps> = ({
	className = '',
	onClickNext = () => {},
	onClickPrev = () => {},
	btnClassName = 'w-10 h-10',
	onlyNext = false,
	onlyPrev = false,
}) => {
	return (
		<div
			className={`nc-NextPrev relative flex items-center text-neutral-900 dark:text-neutral-300 ${className}`}
			data-nc-id="NextPrev"
			data-glide-el="controls"
		>
			{!onlyNext && (
				<button
					className={`${btnClassName} ${
						!onlyPrev ? 'mr-[6px]' : ''
					} flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500 ${twFocusClass()}`}
					onClick={onClickPrev}
					title="Prev"
					data-glide-dir="<"
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</button>
			)}
			{!onlyPrev && (
				<button
					className={`${btnClassName} flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500 ${twFocusClass()}`}
					onClick={onClickNext}
					title="Next"
					data-glide-dir=">"
				>
					<ChevronRightIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	)
}

export default NextPrev
