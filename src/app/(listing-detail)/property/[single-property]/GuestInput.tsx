// 'use client'
// // sidebar section guests
// import React, { Fragment, FC, useState, useEffect } from 'react'
// import {
// 	Popover,
// 	PopoverButton,
// 	PopoverPanel,
// 	Transition,
// } from '@headlessui/react'
// import NcInputNumber from '@/components/NcInputNumber'
// import { UserPlusIcon } from '@heroicons/react/24/outline'
// import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
// import { GuestsObject } from '@/app/(client-components)/type'

// export interface GuestsInputProps {
// 	className?: string;
// 	guestAdultsInputValue?: any;
// 	guestChildrenInputValue?: any;
// 	guestInfantsInputValue?: any;
// 	setGuestAdultsInputValue?: any;
// 	setGuestChildrenInputValue?: any;
// 	setGuestInfantsInputValue?: any;
// 	currentActiveRoom?: any;
// 	guestLimitExceed?: any;
// 	setGuestLimitExceed?: any;
// 	numberOfRoomSelected?: any;
// 	setNumberOfRoomSelected?: any;
// }

// const GuestsInput: FC<GuestsInputProps> = ({ className = 'flex-1',setNumberOfRoomSelected, numberOfRoomSelected, guestLimitExceed, setGuestLimitExceed, currentActiveRoom, guestAdultsInputValue, guestChildrenInputValue, guestInfantsInputValue, setGuestAdultsInputValue, setGuestChildrenInputValue, setGuestInfantsInputValue }) => {
// 	// const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0)
// 	// const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0)
// 	// const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0)

// 	const handleChangeData = (value: number, type: keyof GuestsObject) => {
// 		let newValue = {
// 			guestAdults: guestAdultsInputValue,
// 			guestChildren: guestChildrenInputValue,
// 			guestInfants: guestInfantsInputValue,
// 		}
// 		if (type === 'guestAdults') {
// 			setGuestAdultsInputValue(value)
// 			newValue.guestAdults = value
// 		}
// 		if (type === 'guestChildren') {
// 			setGuestChildrenInputValue(value)
// 			newValue.guestChildren = value
// 		}
// 		if (type === 'guestInfants') {
// 			setGuestInfantsInputValue(value)
// 			newValue.guestInfants = value
// 		}
// 	}

// 	const totalGuests = guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue

// 	useEffect(()=>{
// 		if((guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue) > (numberOfRoomSelected * currentActiveRoom?.accommodates)){
// 			setGuestLimitExceed(true)
// 		}else{
// 			setGuestLimitExceed(false)
// 		}
// 	},[guestInfantsInputValue, guestAdultsInputValue, guestChildrenInputValue, numberOfRoomSelected])





// 	useEffect(() => {
// 		if (!guestAdultsInputValue || guestAdultsInputValue === 0) {
// 		  setGuestAdultsInputValue(1);
// 		}
// 	  }, []);

// 	return (
// 		<Popover className={`relative flex ${className}`}>
// 			{({ open }) => (
// 				<>
// 					<div
// 						className={`flex flex-1 items-center rounded-b-3xl focus:outline-none ${
// 							open ? 'shadow-lg' : ''
// 						}`}
// 					>
// 						<PopoverButton
// 							className={`relative z-10 flex flex-1 items-center space-x-3 p-3 text-left focus:outline-none`}
// 						>
// 							<div className="text-neutral-300 dark:text-neutral-400">
// 								<UserPlusIcon className="h-5 w-5 lg:h-7 lg:w-7" />
// 							</div>
// 							<div className="flex-grow">
// 								<span className="block font-semibold xl:text-lg">
// 									{totalGuests || ''} Guests
// 								</span>
// 								<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
// 									{totalGuests ? 'Guests' : 'Add guests'}
// 								</span>
// 							</div>

// 							{!!totalGuests && open && (
// 								<ClearDataButton
// 									onClick={() => {
// 										setGuestAdultsInputValue(1)
// 										setGuestChildrenInputValue(0)
// 										setGuestInfantsInputValue(0)
// 									}}
// 								/>
// 							)}
// 						</PopoverButton>
// 					</div>

// 					<Transition
// 						as={Fragment}
// 						enter="transition ease-out duration-200"
// 						enterFrom="opacity-0 translate-y-1"
// 						enterTo="opacity-100 translate-y-0"
// 						leave="transition ease-in duration-150"
// 						leaveFrom="opacity-100 translate-y-0"
// 						leaveTo="opacity-0 translate-y-1"
// 					>
// 						<PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
// 							<NcInputNumber
// 								className="w-full"
// 								defaultValue={guestAdultsInputValue}
// 								onChange={(value) => handleChangeData(value, 'guestAdults')}
// 								// max={10}

// 								min={1}
// 								label="Adults"
// 								desc="Ages 13 or above"
// 							/>
// 							<NcInputNumber
// 								className="mt-6 w-full"
// 								defaultValue={guestChildrenInputValue}
// 								onChange={(value) => handleChangeData(value, 'guestChildren')}
// 								// min={0}
// 								// max={4}
// 								label="Children"
// 								desc="Ages 7–12"
// 							/>

// 							<NcInputNumber
// 								className="mt-6 w-full"
// 								defaultValue={guestInfantsInputValue}
// 								onChange={(value) => handleChangeData(value, 'guestInfants')}
// 								// max={4}
// 								// min={0}
// 								label="Children"
// 								desc="Ages 0–6"
// 							/>
// 						</PopoverPanel>
// 					</Transition>
// 				</>
// 			)}
// 		</Popover>
// 	)
// }

// export default GuestsInput



'use client'

import React, { Fragment, FC, useEffect } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
import { GuestsObject } from '@/app/(client-components)/type'

export interface GuestsInputProps {
	className?: string;
	guestAdultsInputValue?: number;
	guestChildrenInputValue?: number;
	guestInfantsInputValue?: number;
	extraGuest?: number;
	setGuestAdultsInputValue?: (val: number) => void;
	setGuestChildrenInputValue?: (val: number) => void;
	setGuestInfantsInputValue?: (val: number) => void;
	setExtraGuest?: (val: number) => void;
	currentActiveRoom?: any;
	listingDetails?: any,
	guestLimitExceed?: boolean;
	setGuestLimitExceed?: (val: boolean) => void;
	numberOfRoomSelected?: number;
	setNumberOfRoomSelected?: (val: number) => void;
}

const GuestsInput: FC<GuestsInputProps> = ({
	className = 'flex-1',
	guestAdultsInputValue = 1,
	guestChildrenInputValue = 0,
	guestInfantsInputValue = 0,
	extraGuest = 0,
	listingDetails,
	setGuestAdultsInputValue,
	setGuestChildrenInputValue,
	setGuestInfantsInputValue,
	setExtraGuest,
	currentActiveRoom,
	guestLimitExceed,
	setGuestLimitExceed,
	numberOfRoomSelected = 1
}) => {

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		if (type === 'guestAdults') setGuestAdultsInputValue?.(value)
		if (type === 'guestChildren') setGuestChildrenInputValue?.(value)
		if (type === 'guestInfants') setGuestInfantsInputValue?.(value)
	}

	const totalGuests = guestChildrenInputValue + guestAdultsInputValue  + (extraGuest || 0)

	// useEffect(() => {
	// 	if ((guestChildrenInputValue + guestAdultsInputValue + extraGuest) > (numberOfRoomSelected * currentActiveRoom?.accommodates)) {
	// 		setGuestLimitExceed?.(true)
	// 	} else {
	// 		setGuestLimitExceed?.(false)
	// 	}
	// }, [guestInfantsInputValue, guestAdultsInputValue, guestChildrenInputValue, numberOfRoomSelected])

// 	useEffect(() => {
// 	const totalGuests = guestAdultsInputValue + guestChildrenInputValue + extraGuest;
// 	const maxGuests =  listingDetails?.rooms?.[0]?.accommodates;
// 	console.log('numberOfRoomSelected',numberOfRoomSelected);
// 	console.log('Accommodates', maxGuests);
// 	if (totalGuests > maxGuests) {
// 		setGuestLimitExceed?.(true);
// 	} else {
// 		setGuestLimitExceed?.(false);
// 	}
// }, [guestAdultsInputValue, guestChildrenInputValue, extraGuest, numberOfRoomSelected, currentActiveRoom]);

// useEffect(() => {
//   const totalGuests = guestAdultsInputValue + guestChildrenInputValue + extraGuest;


//   const totalAccommodates = currentActiveRoom?.rooms?.reduce(
//     (acc: number, room: any) => acc + (room.accommodates * room.count),
//     0
//   ) || 0;

//   if (totalGuests > totalAccommodates) {
//     setGuestLimitExceed?.(true);
//   } else {
//     setGuestLimitExceed?.(false);
//   }
// }, [guestAdultsInputValue, guestChildrenInputValue, extraGuest, currentActiveRoom, setGuestLimitExceed]);


useEffect(() => {
  const totalGuests = guestAdultsInputValue + guestChildrenInputValue + extraGuest;
  const totalAccommodates = currentActiveRoom?.rooms?.reduce(
    (acc: number, room: any) => acc + (room.accommodates * room.count),
    0
  ) || 0;
console.log(currentActiveRoom?.rooms?.[0]?.accommodates, 'Guest Page totalAccommodates')

  if (totalGuests > totalAccommodates) {
    setGuestLimitExceed?.(true);
  } else {
    setGuestLimitExceed?.(false);
  }
}, [guestAdultsInputValue, guestChildrenInputValue, extraGuest, currentActiveRoom]);
	useEffect(() => {
		if (!guestAdultsInputValue || guestAdultsInputValue === 0) {
			setGuestAdultsInputValue?.(1)
		}
	}, [guestAdultsInputValue, setGuestAdultsInputValue])

	return (
		<Popover className={`relative flex ${className}`}>
			{({ open }) => (
				<>
					<div className={`flex flex-1 items-center rounded-b-3xl focus:outline-none ${open ? 'shadow-lg' : ''}`}>
						<PopoverButton className="relative z-10 flex flex-1 items-center space-x-3 p-3 text-left focus:outline-none">
							<div className="text-neutral-300 dark:text-neutral-400">
								<UserPlusIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>
							<div className="flex-grow">
								<span className="block font-semibold xl:text-lg">{totalGuests || ''} Guests</span>
								<span className="mt-1 mb-2 block text-sm font-light leading-none text-neutral-400">
									{totalGuests ? 'Guests' : 'Add guests'}
								</span>
							</div>
							{!!totalGuests && open && (
								<ClearDataButton onClick={() => {
									setGuestAdultsInputValue?.(1)
									setGuestChildrenInputValue?.(0)
									setGuestInfantsInputValue?.(0)
									setExtraGuest?.(0)
								}} />
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
						<PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<NcInputNumber className="w-full" defaultValue={guestAdultsInputValue} onChange={(value) => handleChangeData(value, 'guestAdults')} min={1} label="Adults"  />
							<NcInputNumber
								className="mt-6 w-full"
								defaultValue={extraGuest}
								onChange={(value) => setExtraGuest?.(value)}
								min={0}
								max={4}
								label="Extra Guests"
								desc="Ages 13 or above"
							/>
							
							<NcInputNumber className="mt-6 w-full" defaultValue={guestChildrenInputValue} onChange={(value) => handleChangeData(value, 'guestChildren')} label="Children" desc="Ages 7–12" />
							<NcInputNumber className="mt-6 w-full" defaultValue={guestInfantsInputValue} onChange={(value) => handleChangeData(value, 'guestInfants')} label="Infants" desc="Ages 0–6" />

						

						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default GuestsInput
