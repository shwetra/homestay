'use client'

import converSelectedDateToString from '@/utils/converSelectedDateToString'
import React, { useState } from 'react'
import { GuestsObject } from '../../type'
import GuestsInput from '../GuestsInput'
import LocationInput from '../LocationInput'
import DatesRangeInput from '../DatesRangeInput'

const StaySearchForm = () => {
	//
	const [fieldNameShow, setFieldNameShow] = useState<
		'location' | 'dates' | 'guests'
	>('location')
	//
	const [locationInputTo, setLocationInputTo] = useState('')
	const [guestInput, setGuestInput] = useState<GuestsObject>({
		guestAdults: 0,
		guestChildren: 0,
		guestInfants: 0,
	})
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

	const renderInputLocation = () => {
		const isActive = fieldNameShow === 'location'
		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('location')}
					>
						<span className="text-neutral-400">Where</span>
						<span>{locationInputTo || 'Location'}</span>
					</button>
				) : (
					<LocationInput
						defaultValue={locationInputTo}
						onChange={(value) => {
							setLocationInputTo(value)
							setFieldNameShow('dates')
						}}
					/>
				)}
			</div>
		)
	}

	const renderInputDates = () => {
		const isActive = fieldNameShow === 'dates'

		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('dates')}
					>
						<span className="text-neutral-400">When</span>
						<span>
							{startDate
								? converSelectedDateToString([startDate, endDate])
								: 'Add date'}
						</span>
					</button>
				) : (
					<DatesRangeInput />
				)}
			</div>
		)
	}

	const renderInputGuests = () => {
		const isActive = fieldNameShow === 'guests'
		let guestSelected = ''
		if (guestInput.guestAdults || guestInput.guestChildren) {
			const guest =
				(guestInput.guestAdults || 0) + (guestInput.guestChildren || 0)
			guestSelected += `${guest} guests`
		}

		if (guestInput.guestInfants) {
			guestSelected += `, ${guestInput.guestInfants} infants`
		}

		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('guests')}
					>
						<span className="text-neutral-400">Who</span>
						<span>{guestSelected || `Add guests`}</span>
					</button>
				) : (
					<GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
				)}
			</div>
		)
	}

	return (
		<div>
			<div className="w-full space-y-3">
				{/*  */}
				{renderInputLocation()}
				{/*  */}
				{renderInputDates()}
				{/*  */}
				{renderInputGuests()}
			</div>
		</div>
	)
}

export default StaySearchForm
