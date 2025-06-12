'use client'

import React, { Fragment, useState, FC } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'

export interface StayDatesRangeInputProps {
  className?: string,
  startDate?: Date | null,
  setStartDate?: (date: Date | null) => void,
  hoitripdates?: any,
  pricePackage?:number,
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = 'flex-1',
  startDate,
  setStartDate,
  hoitripdates,
  pricePackage
}) => {

  const onChangeDate = (date: Date, closePopover: () => void) => {
    setStartDate?.(date)
    closePopover()
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
              year: 'numeric',
            }) || 'Add check-in date'}
          </span>
          <span className="mt-1 block text-sm font-light leading-none text-neutral-400">
            Check-in Date
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
              <ClearDataButton onClick={() => onChangeDate(null as any, close)} />
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
                <DatePicker
                  selected={startDate}
                  onChange={(date) => onChangeDate(date as Date, close)}
                  monthsShown={2}
                  inline
                  showPopperArrow={false}
                  minDate={new Date()}
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                 renderDayContents={(day: any, date: any) => {
                  const today = new Date();
                  const currentDate = new Date(date);
                  const isPast = currentDate < today;
                    const priceObj = hoitripdates?.find((price:any) => {
                      const dayDate = new Date(price.date).toDateString();
                      return dayDate === date.toDateString();
                    });
                    const id = priceObj?.id ?? null;
                     const price = priceObj?.price ?? 0;
                     const totalPrice = price + (pricePackage ?? 0);
                    

                    return (
                     <div className={`date-cell ${isPast ? 'pointer-events-none opacity-40' : ''}`}>
												<div className={`text-sm ${isPast ? 'line-through text-red-400' : ''}`}>
													<DatePickerCustomDay dayOfMonth={day} date={date} />
												</div>
												{price !== null ? (
													<div className="property-price text-[10px] text-gray-500">
														₹{totalPrice}
													</div>
												):(<div className="property-price text-[10px] text-gray-500">₹{'00'}</div>)}
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
