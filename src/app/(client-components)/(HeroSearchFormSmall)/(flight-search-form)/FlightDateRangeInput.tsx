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
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import ClearDataButton from '../ClearDataButton'
import ButtonSubmit from '../ButtonSubmit'

export interface FlightDateRangeInputProps {
	className?: string
	fieldClassName?: string
	hasButtonSubmit?: boolean
	selectsRange?: boolean
}

const FlightDateRangeInput: FC<FlightDateRangeInputProps> = ({
	className = '',
	fieldClassName = '[ nc-hero-field-padding--small ]',
	hasButtonSubmit = true,
	selectsRange = true,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/05/01'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/05/16'))

	const onChangeRangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	const renderInput = () => {
		return (
			<>
				<div className="flex-grow text-left">
					<span className="block font-semibold xl:text-base">
						{startDate?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
						}) || 'Add dates'}
						{selectsRange && endDate
							? ' - ' +
								endDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								})
							: ''}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{selectsRange ? 'Pick up - Drop off' : 'Pick up date'}
					</span>
				</div>
			</>
		)
	}

	return (
		<>
			<Popover className={`FlightDateRangeInput relative flex ${className}`}>
				{({ open }) => (
					<>
						<div
							className={`z-10 flex flex-1 items-center focus:outline-none ${
								open ? 'nc-hero-field-focused--2' : ''
							}`}
						>
							<PopoverButton
								className={`relative z-10 flex flex-1 ${fieldClassName} items-center space-x-3 focus:outline-none`}
							>
								{renderInput()}

								{startDate && open && (
									<ClearDataButton
										onClick={() => onChangeRangeDate([null, null])}
									/>
								)}
							</PopoverButton>

							{/* BUTTON SUBMIT OF FORM */}
							{hasButtonSubmit && (
								<div className="pr-2 xl:pr-4">
									<ButtonSubmit href="/listing-car-detail" />
								</div>
							)}
						</div>

						{open && (
							<div className="absolute -left-0.5 right-10 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
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
							<PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
								<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
									{selectsRange ? (
										<DatePicker
											selected={startDate}
											onChange={onChangeRangeDate}
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
									) : (
										<DatePicker
											selected={startDate}
											onChange={(date) => setStartDate(date)}
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
									)}
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}

export default FlightDateRangeInput
