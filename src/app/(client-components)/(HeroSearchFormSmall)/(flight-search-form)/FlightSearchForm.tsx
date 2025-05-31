// 'use client'

// import React, { FC, useState } from 'react'
// import LocationInput from '../LocationInput'
// import {
// 	Popover,
// 	PopoverButton,
// 	PopoverPanel,
// 	Transition,
// } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/24/solid'
// import { Fragment } from 'react'
// import NcInputNumber from '@/components/NcInputNumber'
// import FlightDateRangeInput from './FlightDateRangeInput'
// import { GuestsObject } from '../../type'

// export interface FlightSearchFormProps {}

// const flightClass = [
// 	{
// 		name: 'Economy',
// 		href: '##',
// 	},
// 	{
// 		name: 'Business',
// 		href: '##',
// 	},
// 	{
// 		name: 'Multiple',
// 		href: '##',
// 	},
// ]

// const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
// 	const [dropOffLocationType, setDropOffLocationType] = useState<
// 		'roundTrip' | 'oneWay' | ''
// 	>('roundTrip')
// 	const [flightClassState, setFlightClassState] = useState('Economy')
// 	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2)
// 	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1)
// 	const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1)

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

// 	const totalGuests =
// 		guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue

// 	const renderGuest = () => {
// 		return (
// 			<div className="">
// 				<Popover className="relative">
// 					{({ open }) => (
// 						<>
// 							<PopoverButton
// 								className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
// 							>
// 								<span>{`${totalGuests || ''} Guests`}</span>
// 								<ChevronDownIcon
// 									className={`${
// 										open ? '' : 'text-opacity-70'
// 									} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
// 									aria-hidden="true"
// 								/>
// 							</PopoverButton>
// 							<Transition
// 								as={Fragment}
// 								enter="transition ease-out duration-200"
// 								enterFrom="opacity-0 translate-y-1"
// 								enterTo="opacity-100 translate-y-0"
// 								leave="transition ease-in duration-150"
// 								leaveFrom="opacity-100 translate-y-0"
// 								leaveTo="opacity-0 translate-y-1"
// 							>
// 								<PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-full max-w-sm -translate-x-1/2 rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
// 									<NcInputNumber
// 										className="w-full"
// 										defaultValue={guestAdultsInputValue}
// 										onChange={(value) => handleChangeData(value, 'guestAdults')}
// 										max={10}
// 										min={1}
// 										label="Adults"
// 										desc="Ages 13 or above"
// 									/>
// 									<NcInputNumber
// 										className="mt-6 w-full"
// 										defaultValue={guestChildrenInputValue}
// 										onChange={(value) =>
// 											handleChangeData(value, 'guestChildren')
// 										}
// 										max={4}
// 										label="Children"
// 										desc="Ages 2–12"
// 									/>

// 									<NcInputNumber
// 										className="mt-6 w-full"
// 										defaultValue={guestInfantsInputValue}
// 										onChange={(value) =>
// 											handleChangeData(value, 'guestInfants')
// 										}
// 										max={4}
// 										label="Infants"
// 										desc="Ages 0–2"
// 									/>
// 								</PopoverPanel>
// 							</Transition>
// 						</>
// 					)}
// 				</Popover>
// 			</div>
// 		)
// 	}

// 	const renderSelectClass = () => {
// 		return (
// 			<div className="">
// 				<Popover className="relative">
// 					{({ open, close }) => (
// 						<>
// 							<PopoverButton
// 								className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
// 							>
// 								<span>{`${flightClassState}`}</span>
// 								<ChevronDownIcon
// 									className={`${
// 										open ? '' : 'text-opacity-70'
// 									} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
// 									aria-hidden="true"
// 								/>
// 							</PopoverButton>
// 							<Transition
// 								as={Fragment}
// 								enter="transition ease-out duration-200"
// 								enterFrom="opacity-0 translate-y-1"
// 								enterTo="opacity-100 translate-y-0"
// 								leave="transition ease-in duration-150"
// 								leaveFrom="opacity-100 translate-y-0"
// 								leaveTo="opacity-0 translate-y-1"
// 							>
// 								<PopoverPanel className="absolute left-1/2 z-30 mt-3 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:max-w-[220px] sm:px-0">
// 									<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
// 										<div className="relative grid bg-white p-3 dark:bg-neutral-800">
// 											{flightClass.map((item) => (
// 												<a
// 													key={item.name}
// 													href={item.href}
// 													onClick={(e) => {
// 														e.preventDefault()
// 														setFlightClassState(item.name)
// 														close()
// 													}}
// 													className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
// 												>
// 													<p className="text-sm font-medium">{item.name}</p>
// 												</a>
// 											))}
// 										</div>
// 									</div>
// 								</PopoverPanel>
// 							</Transition>
// 						</>
// 					)}
// 				</Popover>
// 			</div>
// 		)
// 	}

// 	const renderRadioBtn = () => {
// 		return (
// 			<div className="flex justify-center space-x-3 pb-3">
// 				<div
// 					className={`flex cursor-pointer select-none items-center rounded-full px-4 py-1.5 text-xs font-medium ${
// 						dropOffLocationType === 'roundTrip'
// 							? 'bg-black text-white shadow-lg shadow-black/10'
// 							: 'border border-neutral-300 dark:border-neutral-700'
// 					}`}
// 					onClick={(e) => setDropOffLocationType('roundTrip')}
// 				>
// 					Round-trip
// 				</div>
// 				<div
// 					className={`flex cursor-pointer select-none items-center rounded-full px-4 py-1.5 text-xs font-medium ${
// 						dropOffLocationType === 'oneWay'
// 							? 'bg-black text-white shadow-lg shadow-black/10'
// 							: 'border border-neutral-300 dark:border-neutral-700'
// 					}`}
// 					onClick={(e) => setDropOffLocationType('oneWay')}
// 				>
// 					One-way
// 				</div>

// 				<div className="border-r border-slate-200 dark:border-slate-700"></div>

// 				<div className="rounded-full border border-neutral-300 dark:border-neutral-700">
// 					{renderSelectClass()}
// 				</div>
// 				<div className="rounded-full border border-neutral-300 dark:border-neutral-700">
// 					{renderGuest()}
// 				</div>
// 			</div>
// 		)
// 	}

// 	const renderForm = () => {
// 		return (
// 			<form className="relative w-full">
// 				{renderRadioBtn()}
// 				<div className="flex w-full rounded-full border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
// 					<LocationInput
// 						placeHolder="Flying from"
// 						desc="Where do you want to fly from?"
// 						className="flex-1"
// 					/>
// 					<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
// 					<LocationInput
// 						placeHolder="Flying to"
// 						desc="Where you want to fly to?"
// 						className="flex-1"
// 						divHideVerticalLineClass=" -inset-x-0.5"
// 					/>
// 					<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
// 					<FlightDateRangeInput
// 						selectsRange={dropOffLocationType !== 'oneWay'}
// 						className="flex-1"
// 					/>
// 				</div>
// 			</form>
// 		)
// 	}

// 	return renderForm()
// }

// export default FlightSearchForm




'use client';

import React, { FC, useState, Fragment } from 'react';
import LocationInput from '../LocationInput';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import NcInputNumber from '@/components/NcInputNumber';
import FlightDateRangeInput from './FlightDateRangeInput';
import { GuestsObject } from '../../type';

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
];

const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
  const [dropOffLocationType, setDropOffLocationType] = useState<
    'roundTrip' | 'oneWay' | ''
  >('roundTrip');

  // State for location inputs
  const [flyingFrom, setFlyingFrom] = useState('');
  const [flyingTo, setFlyingTo] = useState('');

  const [flightClassState, setFlightClassState] = useState('Economy');
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === 'guestAdults') {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === 'guestChildren') {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === 'guestInfants') {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  const renderGuest = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton
                className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
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
                    label="Children"
                    desc="Ages 2–12"
                  />

                  <NcInputNumber
                    className="mt-6 w-full"
                    defaultValue={guestInfantsInputValue}
                    onChange={(value) => handleChangeData(value, 'guestInfants')}
                    max={4}
                    label="Infants"
                    desc="Ages 0–2"
                  />
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  const renderSelectClass = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <PopoverButton
                className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
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
                <PopoverPanel className="absolute left-1/2 z-30 mt-3 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:max-w-[220px] sm:px-0">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative grid bg-white p-3 dark:bg-neutral-800">
                      {flightClass.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setFlightClassState(item.name);
                            close();
                          }}
                          className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
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
      </div>
    );
  };

  const renderRadioBtn = () => {
    return (
      <div className="flex justify-center space-x-3 pb-3">
        <div
          className={`flex cursor-pointer select-none items-center rounded-full px-4 py-1.5 text-xs font-medium ${
            dropOffLocationType === 'roundTrip'
              ? 'bg-black text-white shadow-lg shadow-black/10'
              : 'border border-neutral-300 dark:border-neutral-700'
          }`}
          onClick={() => setDropOffLocationType('roundTrip')}
        >
          Round-trip
        </div>
        <div
          className={`flex cursor-pointer select-none items-center rounded-full px-4 py-1.5 text-xs font-medium ${
            dropOffLocationType === 'oneWay'
              ? 'bg-black text-white shadow-lg shadow-black/10'
              : 'border border-neutral-300 dark:border-neutral-700'
          }`}
          onClick={() => setDropOffLocationType('oneWay')}
        >
          One-way
        </div>

        <div className="border-r border-slate-200 dark:border-slate-700"></div>

        <div className="rounded-full border border-neutral-300 dark:border-neutral-700">
          {renderSelectClass()}
        </div>
        <div className="rounded-full border border-neutral-300 dark:border-neutral-700">
          {renderGuest()}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form className="relative w-full">
        {renderRadioBtn()}
        <div className="flex w-full rounded-full border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <LocationInput
            value={flyingFrom}
            onChange={setFlyingFrom}
            placeHolder="Flying from"
            desc="Where do you want to fly from?"
            className="flex-1"
          />
          <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
          <LocationInput
            value={flyingTo}
            onChange={setFlyingTo}
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
    );
  };

  return renderForm();
};

export default FlightSearchForm;
