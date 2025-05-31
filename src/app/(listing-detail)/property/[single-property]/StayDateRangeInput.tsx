'use client'

import React, { Fragment, useState, FC, useEffect } from 'react'
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
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'

export interface StayDatesRangeInputProps {
	className?: string,
	setDaysToStay?: any,
	startDate?: any,
	setStartDate?: any,
	endDate?: any,
	setEndDate?: any,
	propertyDates?: any,
	previousPrice?: any,
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
	className = 'flex-1', setDaysToStay, startDate, setStartDate, endDate, setEndDate, propertyDates, previousPrice
}) => {

	const onChangeDate = (dates: [Date | null, Date | null], closePopover: () => void) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)

		// Close popover when end date is selected
		if (start && end) {
			closePopover()
		}
	}

	useEffect(() => {
		if (startDate && endDate) {
			// Convert startDate and endDate to Date objects
			const start = new Date(startDate);
			const end = new Date(endDate);

			// Check if the dates are valid
			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				alert('Invalid date format');
				return;
			}

			// Calculate the difference in milliseconds
			const differenceInTime = end.getTime() - start.getTime();

			// Convert milliseconds to days
			const differenceInDays = differenceInTime / (1000 * 3600 * 24);

			// Update the state with the calculated number of days
			setDaysToStay(differenceInDays);
		}
	}, [startDate, endDate]);

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
			{({ open, close }) => (
				<>
					<PopoverButton
						className={`relative flex flex-1 items-center space-x-3 p-3 focus:outline-none ${open ? 'shadow-lg' : ''
							}`}
					>
						{renderInput()}
						{startDate && open && (
							<ClearDataButton onClick={() => onChangeDate([null, null], close)} />
						)}
					</PopoverButton>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute left-auto right-0 top-full z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl xl:-right-10">
							<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
								{/* <DatePicker
									selected={startDate}
									// onChange={onChangeDate}
									onChange={(dates) => onChangeDate(dates as [Date | null, Date | null], close)}
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
								/> */}

								<DatePicker
									selected={startDate}
									// onChange={onChangeDate}
									onChange={(dates) => onChangeDate(dates as [Date | null, Date | null], close)}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									monthsShown={2}
									showPopperArrow={false}
									inline
									minDate={new Date()} // 🚫 Prevent past date selection
									renderCustomHeader={(p) => (
										<DatePickerCustomHeaderTwoMonth {...p} />
									)}
									renderDayContents={(day: any, date: any) => {
										const today = new Date();
										today.setHours(0, 0, 0, 0); // Normalize time

										const currentDate = new Date(date);
										currentDate.setHours(0, 0, 0, 0); // Normalize time

										const isPast = currentDate < today;

										// Convert to UTC string to match propertyDates format
										const utcDate = new Date(date);
										utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
										const dateStr = utcDate.toISOString().split("T")[0];

										const property = propertyDates?.find((item: any) => item.date === dateStr);

										const price =
											previousPrice !== undefined
												? property
													? previousPrice + (property.price / 100) * previousPrice
													: previousPrice
												: null;

										return (
											<div className={`date-cell ${isPast ? 'pointer-events-none opacity-40' : ''}`}>
												<div className={`text-sm ${isPast ? 'line-through text-red-400' : ''}`}>
													<DatePickerCustomDay dayOfMonth={day} date={date} />
												</div>
												{price !== null && (
													<div className="property-price text-[10px] text-gray-500">
														₹{price}
													</div>
												)}
											</div>
										);
									}}
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
