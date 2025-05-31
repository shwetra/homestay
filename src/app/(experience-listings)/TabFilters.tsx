'use client'

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { FunnelIcon } from '@heroicons/react/24/outline'

// DEMO DATA
const typeOfExpriences = [
	{
		name: 'Food & drink',
		description: 'Short description for the experience',
	},
	{
		name: 'Art and culture',
		description: 'Short description for the experience',
	},
	{
		name: 'Nature and outdoors',
		description: 'Short description for the experience',
	},
	{
		name: 'Sports',
		description: 'Short description for the experience',
	},
]

const timeOfdays = [
	{
		name: 'Morning',
		description: 'Start before 12pm',
	},
	{
		name: 'Afternoon',
		description: 'Start after 12pm',
	},
	{
		name: 'Evening',
		description: 'Start after 5pm',
	},
]

//
const moreFilter1 = typeOfExpriences
const moreFilter2 = timeOfdays

const TabFilters = () => {
	const [isOpenMoreFilterMobile, setIsOpenMoreFilterMobile] = useState(false)
	//
	const [isOnSale, setIsOnSale] = useState(true)
	const [rangePrices, setRangePrices] = useState([0, 1000])
	//
	const closeModalMoreFilterMobile = () => setIsOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setIsOpenMoreFilterMobile(true)

	const renderXClear = () => {
		return (
			<span className="ms-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</span>
		)
	}

	const renderTabsTypeOfPlace = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-600 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Type of experiences</span>
							<ChevronDownIcon className="ms-1 h-4 w-4" />
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{typeOfExpriences.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													subLabel={item.description}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsTimeOfDay = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-600 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Time of day</span>
							<ChevronDownIcon className="ms-1 h-4 w-4" />
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{timeOfdays.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													subLabel={item.description}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsPriceRage = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
						>
							<span>
								{`$${convertNumbThousand(
									rangePrices[0],
								)} - $${convertNumbThousand(rangePrices[1])}`}{' '}
							</span>
							{renderXClear()}
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-8 px-5 py-6">
										<div className="space-y-5">
											<span className="font-medium">Price per day</span>
											<Slider
												range
												min={0}
												max={2000}
												defaultValue={[rangePrices[0], rangePrices[1]]}
												allowCross={false}
												onChange={(e) => setRangePrices(e as number[])}
											/>
										</div>

										<div className="flex justify-between space-x-5">
											<div>
												<label
													htmlFor="minPrice"
													className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
												>
													Min price
												</label>
												<div className="relative mt-1 rounded-md">
													<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														name="minPrice"
														disabled
														id="minPrice"
														className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[0]}
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
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														disabled
														name="maxPrice"
														id="maxPrice"
														className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[1]}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabOnSale = () => {
		return (
			<div
				className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm transition-all focus:outline-none ${
					isOnSale
						? 'border-primary-500 bg-primary-50 text-primary-700'
						: 'border-neutral-300 hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-600'
				}`}
				onClick={() => setIsOnSale(!isOnSale)}
			>
				<span>On sale</span>
				{isOnSale && renderXClear()}
			</div>
		)
	}

	const renderMobileMoreFilterItem = (
		data: {
			name: string
			description?: string
			defaultChecked?: boolean
		}[],
	) => {
		const list1 = data.filter((_, i) => i < data.length / 2)
		const list2 = data.filter((_, i) => i >= data.length / 2)
		return (
			<div className="grid gap-4">
				<div className="flex flex-col space-y-5">
					{list1.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}

	const renderTabMobileFilter = () => {
		return (
			<div>
				<div
					className="flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-5 py-3 text-sm text-primary-700 focus:outline-none lg:hidden"
					onClick={openModalMoreFilterMobile}
				>
					<FunnelIcon className="me-2 h-5 w-5" />
					<span>Filters (3)</span>
				</div>

				<Dialog
					open={isOpenMoreFilterMobile}
					onClose={closeModalMoreFilterMobile}
					className="relative z-50 lg:hidden"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
					/>
					<div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center pt-3">
						<DialogPanel
							className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out data-[closed]:translate-y-16 data-[closed]:opacity-0 dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
							transition
						>
							<div className="relative flex-shrink-0 border-b border-neutral-200 p-4 text-center dark:border-neutral-800">
								<DialogTitle
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									More filters
								</DialogTitle>
								<span className="absolute left-3 top-3">
									<ButtonClose onClick={closeModalMoreFilterMobile} />
								</span>
							</div>

							<div className="hiddenScrollbar flex-grow overflow-y-auto">
								<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800">
									<div className="py-7">
										<h3 className="text-xl font-medium">Type of experiences</h3>
										<div className="relative mt-6">
											{renderMobileMoreFilterItem(moreFilter1)}
										</div>
									</div>
									<div className="py-7">
										<h3 className="text-xl font-medium">Time of day</h3>
										<div className="relative mt-6">
											{renderMobileMoreFilterItem(moreFilter2)}
										</div>
									</div>

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Range Prices</h3>
										<div className="relative mt-6">
											<div className="relative flex flex-col space-y-8">
												<div className="space-y-5">
													<Slider
														className="text-red-400"
														min={0}
														max={2000}
														defaultValue={[0, 1000]}
														allowCross={false}
														onChange={(e) => setRangePrices(e as number[])}
													/>
												</div>

												<div className="flex justify-between space-x-5">
													<div>
														<label
															htmlFor="minPrice"
															className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
														>
															Min price
														</label>
														<div className="relative mt-1 rounded-md">
															<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																name="minPrice"
																disabled
																id="minPrice"
																className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
																value={rangePrices[0]}
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
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																disabled
																name="maxPrice"
																id="maxPrice"
																className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
																value={rangePrices[1]}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-4 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
								<ButtonThird
									onClick={closeModalMoreFilterMobile}
									sizeClass="px-4 py-2.5 sm:px-5"
								>
									Clear
								</ButtonThird>
								<ButtonPrimary
									onClick={closeModalMoreFilterMobile}
									sizeClass="px-4 py-2.5 sm:px-5"
								>
									Apply
								</ButtonPrimary>
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</div>
		)
	}

	return (
		<div className="flex lg:space-x-4">
			<div className="hidden space-x-4 lg:flex">
				{renderTabsTypeOfPlace()}
				{renderTabsPriceRage()}
				{renderTabsTimeOfDay()}
				{renderTabOnSale()}
			</div>
			<div className="flex space-x-2.5 lg:hidden">
				{renderTabMobileFilter()}
				{renderTabOnSale()}
			</div>
		</div>
	)
}

export default TabFilters
