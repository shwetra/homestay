'use client'

import { Fragment, useEffect, useState } from 'react'
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
import NcInputNumber from '@/components/NcInputNumber'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Slider from 'rc-slider'
import convertNumbThousand from '@/utils/convertNumbThousand'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import GooglePlaceComponent from './GooglePlaceComponent'
import debounce from 'lodash/debounce';

// DEMO DATA
const typeOfPaces = [
	{
		name: 'Entire place',
		description: 'Have a place to yourself',
	},
	{
		name: 'Private room',
		description: 'Have your own room and share some common spaces',
	},
	{
		name: 'Hotel room',
		description:
			'Have a private or shared room in a boutique hotel, hostel, and more',
	},
	{
		name: 'Shared room',
		description: 'Stay in a shared space, like a common room',
	},
]

const moreFilter1 = [
	{ name: 'Kitchen', defaultChecked: true },
	{ name: 'Air conditioning', defaultChecked: true },
	{ name: 'Heating' },
	{ name: 'Dryer' },
	{ name: 'Washer' },
	{ name: 'Wifi' },
	{ name: 'Indoor fireplace' },
	{ name: 'Breakfast' },
	{ name: 'Hair dryer' },
	{ name: 'Dedicated workspace' },
]

const moreFilter2 = [
	{ name: 'Free parking on premise' },
	{ name: 'Hot tub' },
	{ name: 'Gym' },
	{ name: 'Pool' },
	{ name: 'EV charger' },
]

const moreFilter3 = [
	{ name: 'House' },
	{ name: 'Bed and breakfast' },
	{ name: 'Apartment', defaultChecked: true },
	{ name: 'Boutique hotel' },
	{ name: 'Bungalow' },
	{ name: 'Chalet', defaultChecked: true },
	{ name: 'Condominium', defaultChecked: true },
	{ name: 'Cottage' },
	{ name: 'Guest suite' },
	{ name: 'Guesthouse' },
]

const moreFilter4 = [{ name: 'Pets allowed' }, { name: 'Smoking allowed' }]

const locations = [
	{ id: 1, name: 'Delhi' },
	{ id: 2, name: 'Manali' },
	{ id: 3, name: 'Shimla' },
	{ id: 4, name: 'Ladakh' },
	{ id: 5, name: 'Nanital' },
  ]

const TabFilters = () => {
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState<any>(false)
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState<any>(false)
	const [rangePrices, setRangePrices] = useState<any>([0, 1000])

	const [dataForFilter, setDataForFilter] = useState<any>()

	const [selectedLocation, setSelectedLocation] = useState<any>(locations[0])
  	const [query, setQuery] = useState<any>('')
	const filteredLocation =
	  query === ''
		? locations
		: locations.filter((location:any) => {
			return location.name.toLowerCase().includes(query.toLowerCase())
		  })

		const [location, setLocation] = useState('Delhi');
		const [checkin, setCheckin] = useState('');
		const [checkout, setCheckout] = useState('');
		const [guest, setGuest] = useState(0);
		const [bedrooms, setBedrooms] = useState(0);
		const [beds, setBeds] = useState(0);
		const [bathrooms, setBathrooms] = useState(0);
		const [propertyType, setPropertyType] = useState('');
		const [spaceType, setSpaceType] = useState('');
		const [selectedAmenities, setSelectedAmenities] = useState('');
		const [bookType, setBookType] = useState('');
		const [mapDetails, setMapDetails] = useState('');
		const [minPrice, setMinPrice] = useState(0);
		const [maxPrice, setMaxPrice] = useState(0);
		const [currencyCode, setCurrencyCode] = useState('INR');
		const [items, setItems] = useState(0);
		const [page, setPage] = useState(1);

	// fetch data for filter 
	const fetchDataForFilter = async () => {
		try {
		  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search-index`, {
			headers: {
			  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
			},
		  });
		  if (data.status === 'success') {
			setDataForFilter(data.data);
			setRangePrices([data.data.min_price, data.data.max_price])
		  }
		} catch (error) {
		  console.error(error);
		}
	};


	// search properties api based on filter
	const searchProperties = async () => {
		try {

			const requestData = { location, checkin, checkout, guest, 
				// bedrooms, beds, bathrooms, property_type: propertyType, space_type: spaceType, amenities: selectedAmenities, book_type: bookType, map_details: mapDetails, min_price: minPrice, max_price: maxPrice, currency_code: currencyCode, items, page
			 };
			const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/homesearch`, requestData, {
				headers: {
				  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			})
			if(data.status === "success"){
				console.log("search successful")
				console.log(data)
			}
			
		} catch (error) {
			console.log(error)
		}
	} 

	const handleBedsChange = (value:number) => {
		setBeds(value);
	  };
	  
	  const handleBedroomsChange = (value:number) => {
		setBedrooms(value);
	  };
	  
	  const handleBathroomsChange = (value:number) => {
		setBathrooms(value);
	  };

	  // Handle checkbox change
	const handleCheckboxChange = (id:any) => {
		// Check if the checkbox is already selected
		if (selectedAmenities.includes(id)) {
		// If selected, remove the id from the state
		setSelectedAmenities(prev => prev.split(',').filter(item => item !== id).join(','));
		} else {
		// If not selected, add the id to the state
		setSelectedAmenities(prev => prev ? `${prev},${id}` : `${id}`);
		}
	};

	const debouncedSearchProperties = debounce(searchProperties, 500);

	useEffect(()=>{
		fetchDataForFilter()
	},[])

	useEffect(()=>{
		// searchProperties()
		debouncedSearchProperties();
	},[searchProperties, location, checkin, checkout, beds, bathrooms, bedrooms, propertyType, spaceType, selectedAmenities])

	useEffect(()=>{
		setMinPrice(rangePrices[0])
		setMaxPrice(rangePrices[1])
	},[rangePrices])


	//
	const closeModalMoreFilter = () => setisOpenMoreFilter(false)
	const openModalMoreFilter = () => setisOpenMoreFilter(true)
	//
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true)

	const renderXClear = () => {
		return (
			<span className="ms-2.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
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

	const renderTabsTypeOfPlace = (data:any) => {

		const list = Object?.entries(data?.property_type || {})

		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-600 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Type of property</span>
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
										{list?.map(([key, value]: [string, any]) => (
											<div key={key} className="">
												{/* <Checkbox
													name={value}
													label={value}
													// subLabel={item.description}
												/> */}
												<input onChange={(e)=>setPropertyType(e.target.value)} value={value} type="radio" name="property-type" id={`${key}-${value}`} className='cursor-pointer' />
												<label className='ms-3 cursor-pointer' htmlFor={`${key}-${value}`}>{value}</label>
												
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

	const renderCheckInDate = () => {
		return (
			<div>
				<input type="date" value={checkin} onChange={(e)=>setCheckin(e.target.value)} className='flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:border-primary-500 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600' />
				<small className='text-gray-400 ps-3'>Checkin Date</small>
			</div>
		)
	}

	const renderCheckOutDate = () => {
		return (
			<div>
				<input type="date" value={checkout} onChange={(e)=>setCheckout(e.target.value)} className='flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:border-primary-500 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600' />
				<small className='text-gray-400 ps-3'>Checkout Date</small>
			</div>
		)
	}

	const renderSearchLocation = () => {

		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-600 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Search Location</span>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-sm">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className='flex flex-col items-center justify-center my-5'>
									<Combobox value={selectedLocation} onChange={setSelectedLocation} onClose={() => setQuery('')}>
										<ComboboxInput
											aria-label="Assignee"
											// displayValue={(location) => location?.name }
											onChange={(event) => setQuery(event.target.value)}
											className="w-[90%] rounded-lg border border-gray-300"
										/>
										<ComboboxOptions anchor="bottom" className="z-[99] w-[22rem] rounded-lg p-2 border empty:invisible bg-white">
											{filteredLocation.map((location) => (
											<ComboboxOption key={location.id} value={location} className="data-[focus]:bg-blue-100 bg-white p-2 rounded-md">
												{location.name}
											</ComboboxOption>
											))}
										</ComboboxOptions>
									</Combobox>
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

	const renderTabsRoomAndBeds = (dataForFilter:any) => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-600 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Rooms of Beds</span>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<NcInputNumber label="Beds" onChange={handleBedsChange} defaultValue={dataForFilter?.beds || 0} max={10} />
										<NcInputNumber label="Bedrooms" onChange={handleBedroomsChange} defaultValue={dataForFilter?.bedrooms || 0} max={10} />
										<NcInputNumber label="Bathrooms" onChange={handleBathroomsChange} defaultValue={dataForFilter?.bathrooms || 0} max={10} />
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

	const renderTabsPriceRage = (dataForFilter:any) => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
						>
							<span>
								{`₹${convertNumbThousand(
									rangePrices[0],
								)} - ₹${convertNumbThousand(rangePrices[1])}`}{' '}
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
												className="text-red-400"
												min={1}
												max={2000}
												// min={dataForFilter?.min_price || 1}
												// max={dataForFilter?.max_price || 1000}
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
														₹
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
														₹
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

	const renderMoreFilterItem = (
		data:any,
	) => {
		const list1 = data?.filter((_:any, i:any) => i < data.length / 2)
		const list2 = data?.filter((_:any, i:any) => i >= data.length / 2)
		return (
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col space-y-5">
					{list1?.map((item:any) => (
						<Checkbox
							key={item?.title}
							name={item?.title}
							label={item?.title}
							defaultChecked={selectedAmenities.includes(item.id)}
							onChange={() => handleCheckboxChange(item.id)}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2?.map((item:any) => (
						<Checkbox
							key={item?.title}
							name={item?.title}
							label={item?.title}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}
	  

	const renderTabMoreFilter = (dataForFilter:any) => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
					onClick={openModalMoreFilter}
				>
					<FunnelIcon className="me-2 h-5 w-5" />
					<span>Filters (3)</span>
				</div>

				<Dialog
					open={isOpenMoreFilter}
					onClose={closeModalMoreFilter}
					className="relative z-50 hidden lg:block"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
					/>
					<div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center p-4">
						<DialogPanel
							className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out data-[closed]:translate-y-16 data-[closed]:opacity-0 dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
							transition
						>
							<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
								<DialogTitle
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Filters
								</DialogTitle>
								<span className="absolute left-3 top-3">
									<ButtonClose onClick={closeModalMoreFilter} />
								</span>
							</div>

							<div className="hiddenScrollbar flex-1 overflow-y-auto">
								<div className="divide-y divide-neutral-200 px-10 dark:divide-neutral-800">
									<div className="py-7">
										<h3 className="text-xl font-medium">Amenities</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(dataForFilter?.amenities)}
										</div>
									</div>
									<div className="py-7">
										<h3 className="text-xl font-medium">Space type</h3>
										<div className="relative mt-6">
											{renderPropertyTypes(dataForFilter?.space_type || {})}
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-6 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
								<ButtonThird
									onClick={closeModalMoreFilter}
									sizeClass="px-4 py-2.5 sm:px-5"
								>
									Clear
								</ButtonThird>
								<ButtonPrimary
									onClick={closeModalMoreFilter}
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

	const renderPropertyTypes = (data: any) => {
		
		const entries = Object?.entries(data);
	  
		const list1 = entries?.slice(0, Math.ceil(entries?.length));
		// const list2 = entries?.slice(Math.ceil(entries?.length / 2));
	  
		return (
		  <div className="grid grid-cols-2 gap-4">
			<div className="flex flex-col space-y-5">
			  {list1.map(([key, value]: [string, any], index:number) => (
				// <Checkbox
				//   key={key}
				//   name={key}
				//   label={value}  
				//   defaultChecked={false}
				// />
				<div className='flex gap-1 items-center' key={index}>
					<input onChange={(e)=>setSpaceType(e.target.value)} value={key} type="radio" name="space-type" id={`${key}-${value}`} className='cursor-pointer' />
					<label className='ms-3 cursor-pointer' htmlFor={`${key}-${value}`}>{value}</label>
				</div>
			  ))}
			</div>
			{/* <div className="flex flex-col space-y-5">
			  {list2.map(([key, value]: [string, any]) => (
				<Checkbox
				  key={key}
				  name={key}
				  label={value}  
				  defaultChecked={false} 
				/>
			  ))}
			</div> */}
		  </div>
		);
	  };

	const renderTabMoreFilterMobile = () => {
		return (
			<div>
				<div
					className="flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none lg:hidden"
					onClick={openModalMoreFilterMobile}
				>
					<FunnelIcon className="me-2 h-5 w-5" />
					<span>Filters</span>
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
								<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800">
									
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Search</h3>
										<div className="relative mt-6">
											<GooglePlaceComponent setLocation={setLocation} />
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Select Checkin Date</h3>
										<div className="relative mt-6">
											{renderCheckInDate()}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Select Checkout Date</h3>
										<div className="relative mt-6">
											{renderCheckOutDate()}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Type of place</h3>
										<div className="relative mt-6">
											{/* {renderMoreFilterItem(typeOfPaces)} */}
											{renderTabsTypeOfPlace(dataForFilter)}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Range Prices</h3>
										<div className="relative mt-6">
											{renderTabsPriceRage(dataForFilter)}
											{/* <div className="relative flex flex-col space-y-8">
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
															<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																name="minPrice"
																disabled
																id="minPrice"
																className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
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
															<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																disabled
																name="maxPrice"
																id="maxPrice"
																className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
																value={rangePrices[1]}
															/>
														</div>
													</div>
												</div>
											</div> */}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Rooms and beds</h3>
										<div className="relative mt-6 flex flex-col space-y-5">
											{renderTabsRoomAndBeds(dataForFilter)}
											{/* <NcInputNumber label="Beds" max={10} />
											<NcInputNumber label="Bedrooms" max={10} />
											<NcInputNumber label="Bathrooms" max={10} /> */}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Space Type</h3>
										<div className="relative mt-6">
											{renderPropertyTypes(dataForFilter?.space_type || {})}
											{/* {renderMoreFilterItem(moreFilter2)} */}
										</div>
									</div>

									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Amenities</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(dataForFilter?.amenities)}
											{/* {renderMoreFilterItem(moreFilter1)} */}
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
		<div className="flex lg:space-x-4 relative">
			<div className="hidden space-x-4 lg:flex justify-start flex-wrap gap-3">
				{
					// renderSearchLocation()
					<GooglePlaceComponent setLocation={setLocation} />
				}
				{renderCheckInDate()}
				{renderCheckOutDate()}
				{renderTabsTypeOfPlace(dataForFilter)}
				{renderTabsPriceRage(dataForFilter)}
				{renderTabsRoomAndBeds(dataForFilter)}
				{renderTabMoreFilter(dataForFilter)}
			</div>
			{renderTabMoreFilterMobile()}
		</div>
	)
}

export default TabFilters
