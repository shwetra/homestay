'use client'

import React, { Fragment, useState } from 'react'
import { FC } from 'react'
import DatePicker from 'react-datepicker'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'

export interface RentalCarDatesRangeInputProps {
	className?: string
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
	className = '',
}) => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/03/01'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/03/16'))

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
						{'Pick up - Drop off'}
					</span>
				</div>
			</>
		)
	}

	return (
		<>
			<Popover
				className={`RentalCarDatesRangeInput relative flex w-full ${className}`}
			>
				{({ open }) => (
					<>
						<div
							className={`flex flex-1 items-center rounded-2xl focus:outline-none ${
								open ? 'shadow-lg' : ''
							}`}
						>
							<PopoverButton
								className={`relative flex flex-1 items-center space-x-3 p-3 focus:outline-none`}
							>
								{renderInput()}

								{startDate && open && (
									<ClearDataButton onClick={() => onChangeDate([null, null])} />
								)}
							</PopoverButton>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl xl:-right-10">
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
		</>
	)
}

export default RentalCarDatesRangeInput
