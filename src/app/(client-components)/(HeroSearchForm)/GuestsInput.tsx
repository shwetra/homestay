'use client'

import React, { Fragment, useEffect, useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'
import ClearDataButton from './ClearDataButton'
import ButtonSubmit from './ButtonSubmit'
import { PathName } from '@/routers/types'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { GuestsObject } from '../type'

export interface GuestsInputProps {
	fieldClassName?: string
	className?: string
	buttonSubmitHref?: PathName
	hasButtonSubmit?: boolean
}

const GuestsInput: FC<GuestsInputProps> = ({
	fieldClassName = '[ nc-hero-field-padding ]',
	className = '[ nc-flex-1 ]',
	buttonSubmitHref = '/listing-stay-map',
	hasButtonSubmit = true,
}) => {
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

	return (
		<Popover className={`relative flex ${className}`}>
			{({ open }) => (
				<>
					<div
						className={`z-10 flex flex-1 items-center focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
					>
						<PopoverButton
							className={`relative z-10 flex flex-1 items-center text-left ${fieldClassName} space-x-3 focus:outline-none`}
						>
							<div className="text-neutral-300 dark:text-neutral-400">
								<UserPlusIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>
							<div className="flex-grow">
								<span className="block font-semibold xl:text-lg">
									{totalGuests || ''} Guests
								</span>
								<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
									{totalGuests ? 'Guests' : 'Add guests'}
								</span>
							</div>

							{!!totalGuests && open && (
								<ClearDataButton
									onClick={() => {
										setGuestAdultsInputValue(0)
										setGuestChildrenInputValue(0)
										setGuestInfantsInputValue(0)
									}}
								/>
							)}
						</PopoverButton>

						{/* BUTTON SUBMIT OF FORM */}
						{hasButtonSubmit && (
							<div className="pr-2 xl:pr-4">
								<ButtonSubmit href={buttonSubmitHref} />
							</div>
						)}
					</div>

					{open && (
						<div className="absolute -left-0.5 right-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
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
						<PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
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

export default GuestsInput
