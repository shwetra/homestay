'use client'

import React, { Fragment, useState, FC } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import ClearDataButton from '../ClearDataButton'

export interface StayDatesRangeInputProps {
	className?: string
	fieldClassName?: string
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
	className = '[ lg:nc-flex-2 ]',
	fieldClassName = '[ nc-hero-field-padding ]',
}) => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/02/06'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/02/23'))
	//

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	const renderInput = () => {
		return (
			<>
				<div className="text-neutral-300 dark:text-neutral-400">
					<CalendarIcon className="h-5 w-5 lg:h-7 lg:w-7" />
				</div>
				<div className="flex-grow text-left">
					<span className="block font-semibold xl:text-lg">
						{startDate?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
						}) || 'Add dates'}
						{endDate
							? ' - ' +
								endDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								})
							: ''}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{'Check in - Check out'}
					</span>
				</div>
			</>
		)
	}

	return (
		<Popover className={`StayDatesRangeInput relative z-10 flex ${className}`}>
			{({ open }) => (
				<>
					<PopoverButton
						className={`relative z-10 flex flex-1 ${fieldClassName} items-center space-x-3 focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
					>
						{renderInput()}
						{startDate && open && (
							<ClearDataButton onClick={() => onChangeDate([null, null])} />
						)}
					</PopoverButton>

					{open && (
						<div className="absolute -inset-x-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
					)}

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute left-1/2 top-full z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
							<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
								<DatePicker
									selected={startDate}
									onChange={onChangeDate}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									monthsShown={2}
									showPopperArrow={false}
									inline
									renderCustomHeader={(p) => (
										<DatePickerCustomHeaderTwoMonth {...p} />
									)}
									renderDayContents={(day, date) => (
										<DatePickerCustomDay dayOfMonth={day} date={date} />
									)}
								/>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default StayDatesRangeInput
