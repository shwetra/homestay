'use client'

import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { FC, useState } from 'react'

export interface FlightCardProps {
	className?: string
	data: {
		id: string
		airlines: {
			logo: string
			name: string
		}
		price: string
	}
}

const FlightCard: FC<FlightCardProps> = ({ className = '', data }) => {
	const [isOpen, setIsOpen] = useState(false)

	const renderDetailTop = () => {
		return (
			<div>
				<div className="flex flex-col md:flex-row">
					<div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
						<Image
							src={data.airlines.logo}
							className="w-10"
							alt=""
							sizes="40px"
							width={40}
							height={40}
						/>
					</div>
					<div className="my-5 flex md:my-0">
						<div className="flex flex-shrink-0 flex-col items-center py-2">
							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
							<span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
						</div>
						<div className="ml-4 space-y-10 text-sm">
							<div className="flex flex-col space-y-1">
								<span className="text-neutral-500 dark:text-neutral-400">
									Monday, August 12 · 10:00
								</span>
								<span className="font-semibold">
									Tokyo International Airport (HND)
								</span>
							</div>
							<div className="flex flex-col space-y-1">
								<span className="text-neutral-500 dark:text-neutral-400">
									Monday, August 16 · 10:00
								</span>
								<span className="font-semibold">
									Singapore International Airport (SIN)
								</span>
							</div>
						</div>
					</div>
					<div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
					<ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400 md:space-y-2">
						<li>Trip time: 7 hours 45 minutes</li>
						<li>ANA · Business class · Boeing 787 · NH 847</li>
					</ul>
				</div>
			</div>
		)
	}

	const renderDetail = () => {
		if (!isOpen) return null
		return (
			<div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 md:p-8">
				{renderDetailTop()}
				<div className="my-7 space-y-5 md:my-10 md:pl-24">
					<div className="border-t border-neutral-200 dark:border-neutral-700" />
					<div className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
						Transit time: 15 hours 45 minutes - Bangkok (BKK)
					</div>
					<div className="border-t border-neutral-200 dark:border-neutral-700" />
				</div>
				{renderDetailTop()}
			</div>
		)
	}

	return (
		<div
			className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 ${className}`}
		>
			<div className={`relative sm:pr-20 ${className}`}>
				{/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
				<a href="##" className="absolute inset-0" />

				<span
					className={`absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${
						isOpen ? '-rotate-180 transform' : ''
					}`}
					onClick={() => setIsOpen(!isOpen)}
				>
					<ChevronDownIcon className="h-5 w-5" />
				</span>

				<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
					{/* LOGO IMG */}
					<div className="w-24 flex-shrink-0 lg:w-32">
						<Image
							src={data.airlines.logo}
							width={40}
							height={40}
							className="w-10"
							alt="air-logo"
							sizes="40px"
						/>
					</div>

					{/* FOR MOBILE RESPONSIVE */}
					<div className="block space-y-1 lg:hidden">
						<div className="flex font-semibold">
							<div>
								<span>11:00</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									HND
								</span>
							</div>
							<span className="flex w-12 justify-center">
								<ArrowRightIcon className="h-5 w-5" />
							</span>
							<div>
								<span>20:00</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									SIN
								</span>
							</div>
						</div>

						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							<span className="VG3hNb">Nonstop</span>
							<span className="mx-2">·</span>
							<span>7h 45m</span>
							<span className="mx-2">·</span>
							<span>HAN</span>
						</div>
					</div>

					{/* TIME - NAME */}
					<div className="hidden min-w-[150px] flex-[4] lg:block">
						<div className="text-lg font-medium">11:00 - 20:00</div>
						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							{data.airlines.name}
						</div>
					</div>

					{/* TIMME */}
					<div className="hidden flex-[4] whitespace-nowrap lg:block">
						<div className="text-lg font-medium"> HND - SIN</div>
						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							7 hours 15 minutes
						</div>
					</div>

					{/* TYPE */}
					<div className="hidden flex-[4] whitespace-nowrap lg:block">
						<div className="text-lg font-medium">1 stop</div>
						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							2 hours 15 minutes BKK
						</div>
					</div>

					{/* PRICE */}
					<div className="flex-[4] whitespace-nowrap sm:text-right">
						<div>
							<span className="text-secondary-600 text-xl font-semibold">
								{data.price}
							</span>
						</div>
						<div className="mt-0.5 text-xs font-normal text-neutral-500 sm:text-sm">
							round-trip
						</div>
					</div>
				</div>
			</div>

			{/* DETAIL */}
			{renderDetail()}
		</div>
	)
}

export default FlightCard
