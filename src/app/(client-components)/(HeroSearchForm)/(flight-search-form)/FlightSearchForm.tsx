'use client'

import React, { FC, useState } from 'react'
import LocationInput from '../LocationInput'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import NcInputNumber from '@/components/NcInputNumber'
import FlightDateRangeInput from './FlightDateRangeInput'
import { GuestsObject } from '@/app/(client-components)/type'

export interface FlightSearchFormProps {}

const flightClass = [
	{
		name: 'Economy',
		href: '##',
	},
	{
		name: 'Business',
		href: '##',
	},
	{
		name: 'Multiple',
		href: '##',
	},
]

export type TypeDropOffLocationType = 'roundTrip' | 'oneWay' | ''

const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
	const [dropOffLocationType, setDropOffLocationType] =
		useState<TypeDropOffLocationType>('roundTrip')
	const [flightClassState, setFlightClassState] = useState('Economy')

	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2)
	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1)
	const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1)

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
			guestChildren: guestChildrenInputValue,
			guestInfants: guestInfantsInputValue,
		}
		if (type === 'guestAdults') {
			setGuestAdultsInputValue(value)
			newValue.guestAdults = value
		}
		if (type === 'guestChildren') {
			setGuestChildrenInputValue(value)
			newValue.guestChildren = value
		}
		if (type === 'guestInfants') {
			setGuestInfantsInputValue(value)
			newValue.guestInfants = value
		}
	}

	const totalGuests =
		guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue

	const renderGuest = () => {
		return (
			<Popover className="relative">
				{({ open }) => (
					<>
						<PopoverButton
							as="button"
							className={` ${open ? '' : ''} inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span>{`${totalGuests || ''} Guests`}</span>
							<ChevronDownIcon
								className={`${
									open ? '' : 'text-opacity-70'
								} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
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
							<PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-full max-w-sm -translate-x-1/2 rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
								<NcInputNumber
									className="w-full"
									defaultValue={guestAdultsInputValue}
									onChange={(value) => handleChangeData(value, 'guestAdults')}
									max={10}
									min={1}
									label="Adults"
									desc="Ages 13 or above"
								/>
								<NcInputNumber
									className="mt-6 w-full"
									defaultValue={guestChildrenInputValue}
									onChange={(value) => handleChangeData(value, 'guestChildren')}
									max={4}
									label="Child"
									desc="Ages 0–6"
								/>

								<NcInputNumber
									className="mt-6 w-full"
									defaultValue={guestInfantsInputValue}
									onChange={(value) => handleChangeData(value, 'guestInfants')}
									max={4}
									label="Child"
									desc="Ages 7–12"
								/>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderSelectClass = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={` ${open ? '' : ''} inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span>{`${flightClassState}`}</span>
							<ChevronDownIcon
								className={`${
									open ? '' : 'text-opacity-70'
								} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
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
							<PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:max-w-[220px] sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
									<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
										{flightClass.map((item) => (
											<a
												key={item.name}
												href={item.href}
												onClick={(e) => {
													e.preventDefault()
													setFlightClassState(item.name)
													close()
												}}
												className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
											>
												<p className="text-sm font-medium">{item.name}</p>
											</a>
										))}
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderRadioBtn = () => {
		return (
			<div className="[ nc-hero-field-padding ] flex flex-row flex-wrap border-b border-neutral-100 py-5 dark:border-neutral-700">
				<div
					className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${
						dropOffLocationType === 'roundTrip'
							? 'bg-black text-white shadow-lg shadow-black/10'
							: 'border border-neutral-300 dark:border-neutral-700'
					}`}
					onClick={(e) => setDropOffLocationType('roundTrip')}
				>
					Round-trip
				</div>
				<div
					className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${
						dropOffLocationType === 'oneWay'
							? 'bg-black text-white shadow-lg shadow-black/10'
							: 'border border-neutral-300 dark:border-neutral-700'
					}`}
					onClick={(e) => setDropOffLocationType('oneWay')}
				>
					One-way
				</div>

				<div className="my-1 mr-2 h-8 self-center border-r border-slate-200 dark:border-slate-700 sm:mr-3"></div>

				<div className="my-1 mr-2 rounded-full border border-neutral-300 dark:border-neutral-700 sm:mr-3">
					{renderSelectClass()}
				</div>
				<div className="my-1 rounded-full border border-neutral-300 dark:border-neutral-700">
					{renderGuest()}
				</div>
			</div>
		)
	}

	const renderForm = () => {
		return (
			<form className="relative mt-8 w-full rounded-[40px] rounded-t-2xl bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl xl:rounded-[49px] xl:rounded-t-3xl">
				{renderRadioBtn()}
				<div className="flex flex-1 rounded-full">
					<LocationInput
						placeHolder="Flying from"
						desc="Where do you want to fly from?"
						className="flex-1"
					/>
					<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
					<LocationInput
						placeHolder="Flying to"
						desc="Where you want to fly to?"
						className="flex-1"
						divHideVerticalLineClass=" -inset-x-0.5"
					/>
					<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
					<FlightDateRangeInput
						selectsRange={dropOffLocationType !== 'oneWay'}
						className="flex-1"
					/>
				</div>
			</form>
		)
	}

	return renderForm()
}

export default FlightSearchForm
