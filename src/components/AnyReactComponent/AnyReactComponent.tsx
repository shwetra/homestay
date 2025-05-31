'use client'

import { Transition } from '@headlessui/react'
import CarCard from '@/components/CarCard'
import ExperiencesCard from '@/components/ExperiencesCard'
import StayCard from '@/components/StayCard'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'
import React, { FC, Fragment } from 'react'
import { useState } from 'react'
import StayCard2Copy from '../StayCard2Copy'

export interface AnyReactComponentProps {
	className?: string
	listing?: any //StayDataType
	experiences?: ExperiencesDataType
	car?: CarDataType
	isSelected?: boolean
	lat: number
	lng: number
}

// const AnyReactComponent: FC<AnyReactComponentProps> = ({
// 	className = '',
// 	listing,
// 	car,
// 	experiences,
// 	isSelected,
// }) => {
// 	const [isOpen, setIsOpen] = useState(false)


// 	return (
// 		<div
// 			className={`nc-AnyReactComponent relative ${className}`}
// 			onMouseEnter={() => setIsOpen(true)}
// 			onMouseLeave={() => setIsOpen(false)}
// 		>
// 			<span
// 				className={`flex min-w-max items-center justify-center rounded-lg px-2 py-1 text-sm font-semibold shadow-lg transition-colors ${
// 					isSelected
// 						? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
// 						: 'bg-white hover:bg-neutral-900 hover:text-white dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900'
// 				}`}
// 			>
// 				{listing?.property_price?.price}
// 			</span>
// 			<Transition
// 				show={isOpen}
// 				as={Fragment}
// 				enter="transition-opacity duration-75"
// 				enterFrom="opacity-0"
// 				enterTo="opacity-100"
// 				leave="transition-opacity duration-150"
// 				leaveFrom="opacity-100"
// 				leaveTo="opacity-0"
// 			>
// 				<div className="aspect-w-1 absolute -left-12 bottom-full z-50 w-[260px] pb-3">
// 					{listing && (
// 						// <StayCard size="small" data={listing} className="shadow-2xl" />
// 						<StayCard2Copy size='small' key={listing.id} data={listing} className="shadow-2xl bg-white rounded-xl p-2" />
// 					)}
// 					{experiences && (
// 						<ExperiencesCard
// 							size="small"
// 							data={experiences}
// 							ratioClass="aspect-w-12 aspect-h-10"
// 							className="rounded-3xl bg-white shadow-2xl dark:bg-neutral-900"
// 						/>
// 					)}
// 					{car && <CarCard size="small" data={car} className="shadow-2xl" />}
// 				</div>
// 			</Transition>
// 		</div>
// 	)
// }



const AnyReactComponent: FC<AnyReactComponentProps> = ({
	className = '',
	listing,
	car,
	experiences,
	isSelected,
  }) => {
	const [isOpen, setIsOpen] = useState(false)
  
	return (
	  <div
		className={`nc-AnyReactComponent relative ${className}`}
		onMouseEnter={() => setIsOpen(true)}
		onMouseLeave={() => setIsOpen(false)}
	  >
		{/* Replace this span with your custom image */}
		<img
		  src="/bgmap.png" // or your custom pin image path
		  alt="Marker Pin"
		  className={`w-10 h-10 cursor-pointer transition-transform ${
			isSelected ? 'scale-125' : 'scale-100'
		  }`}
		/>
  
		{/* The hover card remains as is */}
		<Transition
		  show={isOpen}
		  as={Fragment}
		  enter="transition-opacity duration-75"
		  enterFrom="opacity-0"
		  enterTo="opacity-100"
		  leave="transition-opacity duration-150"
		  leaveFrom="opacity-100"
		  leaveTo="opacity-0"
		>
		  <div className="aspect-w-1 absolute -left-12 bottom-full z-50 w-[260px] pb-3">
			{listing && (
			  <StayCard2Copy
				size="small"
				key={listing.id}
				data={listing}
				className="shadow-2xl bg-white rounded-xl p-2"
			  />
			)}
			{experiences && (
			  <ExperiencesCard
				size="small"
				data={experiences}
				ratioClass="aspect-w-12 aspect-h-10"
				className="rounded-3xl bg-white shadow-2xl dark:bg-neutral-900"
			  />
			)}
			{car && <CarCard size="small" data={car} className="shadow-2xl" />}
		  </div>
		</Transition>
	  </div>
	)
  }

export default AnyReactComponent
