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
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Transition,
} from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'
import {
	ChevronDownIcon,
	FunnelIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

// DEMO DATA
const typeOfAirlines = [
	{
		name: 'Star Alliance',
	},
	{
		name: 'Air China',
	},
	{
		name: 'Air India',
	},
	{
		name: 'Air New Zealand',
	},
	{
		name: 'Asiana',
	},
	{
		name: 'Bangkok Airways',
	},
]
const stopPoints = [
	{
		name: 'Nonstop',
	},
	{
		name: 'Up to 1 stops',
	},
	{
		name: 'Up to 2 stops',
	},
	{
		name: 'Any number of stops',
	},
]

//
const TabFilters = () => {
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false)
	const [isOnSale, setIsOnSale] = useState(true)
	const [rangePrices, setRangePrices] = useState([100, 5000])
	const [tripTimes, setTripTimes] = useState(10)
	const [stopPontsStates, setStopPontsStates] = useState<string[]>([])
	const [airlinesStates, setAirlinesStates] = useState<string[]>([])

	//
	let [catTimes, setCatTimes] = useState({
		'Take Off': {
			Departure: [0, 24],
			Arrival: [0, 24],
		},
		Landing: {
			Departure: [0, 24],
			Arrival: [0, 24],
		},
	})

	//
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true)

	//
	const handleChangeStopPoint = (checked: boolean, name: string) => {
		checked
			? setStopPontsStates([...stopPontsStates, name])
			: setStopPontsStates(stopPontsStates.filter((i) => i !== name))
	}

	const handleChangeAirlines = (checked: boolean, name: string) => {
		checked
			? setAirlinesStates([...airlinesStates, name])
			: setAirlinesStates(airlinesStates.filter((i) => i !== name))
	}

	//

	const renderXClear = () => {
		return (
			<span className="ms-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
				<XMarkIcon className="h-3 w-3" />
			</span>
		)
	}

	const renderTabsTimeFlightTab = () => {
		return (
			<div>
				<TabGroup>
					<TabList className="flex space-x-1 rounded-xl bg-primary-900/10 p-1">
						{Object.keys(catTimes).map((category) => (
							<Tab
								key={category}
								className={({ selected }) =>
									`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:text-primary-400 ${
										selected
											? 'bg-white shadow dark:bg-neutral-800'
											: 'hover:bg-white/[0.15] dark:hover:bg-neutral-800'
									}`
								}
							>
								{category}
							</Tab>
						))}
					</TabList>
					<TabPanels className="mt-2">
						{Object.values(catTimes).map((posts, idx) => {
							return (
								<TabPanel
									key={idx}
									className={
										'space-y-8 rounded-xl bg-neutral-50 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-neutral-900'
									}
								>
									<span className="text-sm text-neutral-600 dark:text-neutral-300">
										{idx ? ' Tokyo to Singapore' : ' Singapore to Tokyo'}
									</span>
									<div></div>
									<div className="space-y-3">
										<div className="flex space-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width={24}
												height={24}
												color={'currentColor'}
												fill={'none'}
												className="h-5 w-5"
											>
												<path
													d="M2.00031 20H18.0003"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M3.82527 12.1661C3.55027 11.9661 3.30027 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
											</svg>
											<span className="text-xs">Departure time:</span>
											<span className="text-xs text-primary-500 dark:text-primary-400">
												{posts.Departure[0]}:00 - {posts.Departure[1]}
												:00
											</span>
										</div>
										<Slider
											range
											min={0}
											max={24}
											defaultValue={posts.Departure}
											onChange={(val) =>
												setCatTimes((catTimes) =>
													!idx
														? {
																...catTimes,
																'Take Off': {
																	...posts,
																	Departure: val as [number, number],
																},
															}
														: {
																...catTimes,
																Landing: {
																	...posts,
																	Departure: val as [number, number],
																},
															},
												)
											}
											allowCross={false}
										/>
									</div>
									<div className="space-y-3">
										<div className="flex space-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width={24}
												height={24}
												color={'currentColor'}
												fill={'none'}
												className="h-5 w-5"
											>
												<path
													d="M2.49811 20.0009H18.4981"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M20.0477 11.0413C21.2211 10.6013 21.3977 10.0013 21.4727 9.60128C21.5977 9.10128 21.2977 7.82628 21.0227 6.85128C20.968 6.6395 20.531 4.98369 20.4677 4.80128C20.2227 3.92628 19.6227 3.96628 19.1977 4.02628C19.0227 4.06378 17.7977 4.39628 17.5977 4.49628C16.9227 4.90128 16.9977 5.97628 16.7977 6.67628C16.5727 7.70128 16.0477 7.85128 15.4477 7.95128C13.3477 8.10128 8.69772 8.47628 8.69772 8.47628C4.72272 8.82628 2.79772 12.0013 2.51272 14.3263C2.37272 15.3013 3.27272 15.6513 3.74772 15.5263L8.97272 14.1013C9.37272 13.9513 9.69772 14.0763 9.92272 14.2263L12.2477 15.7513C12.7727 16.0263 13.2477 16.0513 13.6727 15.9513L15.8477 15.3563C16.2977 15.3063 16.3872 15.0921 16.4477 14.9263C16.5366 14.6828 16.3458 14.4595 16.1227 14.2513C15.9977 14.0763 15.5977 13.6483 15.4477 13.4833C15.2477 13.2263 14.7588 12.8013 14.7977 12.6263C14.4977 12.5013 15.5674 12.3127 17.3477 11.8263C18.3595 11.5498 19.5264 11.2368 20.0477 11.0413Z"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
											</svg>
											<span className="text-xs">Arrival time:</span>
											<span className="text-xs text-primary-500 dark:text-primary-400">
												{posts.Arrival[0]}:00 - {posts.Arrival[1]}:00
											</span>
										</div>
										<Slider
											range
											min={0}
											max={24}
											defaultValue={posts.Arrival}
											onChange={(val) =>
												setCatTimes((catTimes) =>
													!idx
														? {
																...catTimes,
																'Take Off': {
																	...posts,
																	Arrival: val as [number, number],
																},
															}
														: {
																...catTimes,
																Landing: {
																	...posts,
																	Arrival: val as [number, number],
																},
															},
												)
											}
											allowCross={false}
										/>
									</div>
								</TabPanel>
							)
						})}
					</TabPanels>
				</TabGroup>
			</div>
		)
	}

	const renderTabsTypeOfAirlines = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${open ? '!border-primary-500' : ''} ${
								!!airlinesStates.length
									? '!border-primary-500 bg-primary-50'
									: ''
							} `}
						>
							<span>Airlines</span>
							{!airlinesStates.length ? (
								<ChevronDownIcon className="ms-1 h-4 w-4" />
							) : (
								<span onClick={() => setAirlinesStates([])}>
									{renderXClear()}
								</span>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<Checkbox
											name="All Airlines"
											label="All Airlines"
											defaultChecked={airlinesStates.includes('All Airlines')}
											onChange={(checked) =>
												handleChangeAirlines(checked, 'All Airlines')
											}
										/>
										<hr />
										{typeOfAirlines.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													defaultChecked={airlinesStates.includes(item.name)}
													onChange={(checked) =>
														handleChangeAirlines(checked, item.name)
													}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												close()
												setAirlinesStates([])
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
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

	const renderTabsStopPoints = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${open ? '!border-primary-500' : ''} ${
								!!stopPontsStates.length
									? '!border-primary-500 bg-primary-50'
									: ''
							} `}
						>
							<span>Stop points</span>
							{!stopPontsStates.length ? (
								<ChevronDownIcon className="ms-1 h-4 w-4" />
							) : (
								<span onClick={() => setStopPontsStates([])}>
									{renderXClear()}
								</span>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{stopPoints.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													defaultChecked={stopPontsStates.includes(item.name)}
													onChange={(checked) =>
														handleChangeStopPoint(checked, item.name)
													}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												close()
												setStopPontsStates([])
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
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

	const renderTabsTimeFlight = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Flight time</span>
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
										{renderTabsTimeFlightTab()}
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

	const renderTabsTripTime = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
						>
							<span>Less than {tripTimes} hours</span>
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
											<div className="font-medium">
												Trip time:
												<span className="ml-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
											</div>

											<Slider
												min={1}
												max={72}
												defaultValue={tripTimes}
												onChange={(e) => setTripTimes(e as number)}
											/>
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
											<span className="font-medium">Price per person</span>
											<Slider
												range
												min={100}
												max={5000}
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
						: 'border-neutral-300 dark:border-neutral-700'
				}`}
				onClick={() => setIsOnSale(!isOnSale)}
			>
				<span>On sale</span>
				{isOnSale && renderXClear()}
			</div>
		)
	}

	const renderMoreFilterItem = (
		data: {
			name: string
			description?: string
			defaultChecked?: boolean
		}[],
	) => {
		const list1 = data.filter((_, i) => i < data.length / 2)
		const list2 = data.filter((_, i) => i >= data.length / 2)
		return (
			<div className="grid grid-cols-2 gap-8">
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

	// Morefilter for mobile mode
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
									Filters
								</DialogTitle>
								<span className="absolute left-3 top-3">
									<ButtonClose onClick={closeModalMoreFilterMobile} />
								</span>
							</div>

							<div className="hiddenScrollbar flex-grow overflow-y-auto">
								<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 md:px-10">
									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Airlines</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(typeOfAirlines)}
										</div>
									</div>
									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Stop points</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(stopPoints)}
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
														range
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

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">
											Strip times
											<span className="ml-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
										</h3>
										<div className="relative mt-6">
											<Slider
												min={1}
												max={72}
												defaultValue={tripTimes}
												onChange={(e) => setTripTimes(e as number)}
											/>
										</div>
									</div>

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Flight times</h3>
										<div className="relative flex flex-col space-y-5 py-5">
											{renderTabsTimeFlightTab()}
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
			{/* FOR DESKTOP */}
			<div className="hidden space-x-4 lg:flex">
				{renderTabsTypeOfAirlines()}
				{renderTabsTripTime()}
				{renderTabsStopPoints()}
				{renderTabsPriceRage()}
				{renderTabsTimeFlight()}
				{renderTabOnSale()}
			</div>

			{/* FOR RESPONSIVE MOBILE */}
			<div className="flex space-x-2.5 lg:hidden">
				{renderTabMobileFilter()}
				{renderTabOnSale()}
			</div>
		</div>
	)
}

export default TabFilters
