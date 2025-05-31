import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

const DatePickerCustomHeaderTwoMonth = ({
	monthDate,
	customHeaderCount,
	decreaseMonth,
	increaseMonth,
}: ReactDatePickerCustomHeaderProps) => {
	return (
		<div>
			<button
				aria-label="Previous Month"
				className={
					'react-datepicker__navigation react-datepicker__navigation--previous absolute -top-1 left-0 flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700'
				}
				style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
				onClick={decreaseMonth}
				type="button"
			>
				<span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
					<ChevronLeftIcon className="h-5 w-5" />
				</span>
			</button>
			<span className="react-datepicker__current-month">
				{monthDate.toLocaleString('en-US', {
					month: 'long',
					year: 'numeric',
				})}
			</span>
			<button
				aria-label="Next Month"
				className="react-datepicker__navigation react-datepicker__navigation--next absolute -right-0 -top-1 flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
				style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
				type="button"
				onClick={increaseMonth}
			>
				<span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
					<ChevronRightIcon className="h-5 w-5" />
				</span>
			</button>
		</div>
	)
}

export default DatePickerCustomHeaderTwoMonth
