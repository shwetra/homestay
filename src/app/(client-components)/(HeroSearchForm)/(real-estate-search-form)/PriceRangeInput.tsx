'use client'

import React, { Fragment, useState, FC } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import Slider from 'rc-slider'
import convertNumbThousand from '@/utils/convertNumbThousand'
import ButtonSubmit from '../ButtonSubmit'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

export interface PriceRangeInputProps {
	onChange?: (data: any) => void
	fieldClassName?: string
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
	onChange,
	fieldClassName = '[ nc-hero-field-padding ]',
}) => {
	const [rangePrices, setRangePrices] = useState([100000, 4000000])

	return (
		<Popover className="relative flex flex-[1.3]">
			{({ open, close }) => (
				<>
					<div
						className={`z-10 flex flex-1 cursor-pointer items-center focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
					>
						<PopoverButton
							className={`flex flex-1 items-center text-left focus:outline-none ${fieldClassName} space-x-3`}
							onClickCapture={() => document.querySelector('html')?.click()}
						>
							<div className="text-neutral-300 dark:text-neutral-400">
								<CurrencyDollarIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>
							<div className="flex-grow">
								<span className="block truncate font-semibold xl:text-lg">
									{`$${convertNumbThousand(
										rangePrices[0] / 1000,
									)}k ~ $${convertNumbThousand(rangePrices[1] / 1000)}k`}
								</span>
								<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
									Choose price range
								</span>
							</div>
						</PopoverButton>

						{/* BUTTON SUBMIT OF FORM */}
						<div className="pr-2 xl:pr-4">
							<ButtonSubmit href="/listing-real-estate" />
						</div>
					</div>

					{open && (
						<div className="absolute -left-0.5 right-1 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
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
						<PopoverPanel className="absolute left-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6 lg:right-0">
							<div className="relative flex flex-col space-y-8">
								<div className="space-y-5">
									<span className="font-medium">Range Price </span>
									<Slider
										range
										className="text-red-400"
										min={10000}
										max={10000000}
										defaultValue={[rangePrices[0], rangePrices[1]]}
										allowCross={false}
										step={1000}
										onChange={(e) => setRangePrices(e as number[])}
									/>
								</div>

								<div className="flex justify-between space-x-3">
									<div>
										<label
											htmlFor="minPrice"
											className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
										>
											Min price
										</label>
										<div className="relative mt-1 rounded-md">
											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
												<span className="text-neutral-500 sm:text-sm">$</span>
											</div>
											<input
												type="text"
												disabled
												name="minPrice"
												id="minPrice"
												className="block w-full rounded-full border-neutral-200 bg-transparent pl-7 pr-3 text-neutral-900 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-500 dark:text-neutral-200 sm:text-sm"
												value={convertNumbThousand(rangePrices[0])}
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="maxPrice"
											className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
										>
											Max price
										</label>
										<div className="relative mt-1 rounded-md">
											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
												<span className="text-neutral-500 sm:text-sm">$</span>
											</div>
											<input
												disabled
												type="text"
												name="maxPrice"
												id="maxPrice"
												className="focus:border-priring-primary-500 block w-full rounded-full border-neutral-200 bg-transparent pl-7 pr-3 text-neutral-900 focus:ring-primary-500 dark:border-neutral-500 dark:text-neutral-200 sm:text-sm"
												value={convertNumbThousand(rangePrices[1])}
											/>
										</div>
									</div>
								</div>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PriceRangeInput
