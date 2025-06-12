'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import {
	ArrowRightIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Amenities_demos, PHOTOS, Activities_demos, Local_attraction_demos, Excursions_attraction_demos } from './constant'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from '../SectionDateRange'
import { Route } from 'next'
import axios from 'axios'

export interface ListingStayDetailPageProps {}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({}) => {
	//

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)

	const thisPathname = usePathname()
	const router = useRouter()

	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true)
	}

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	// ---------------
	const [listingDetail, setListingDetail] = useState()


	const fetchListingDetails = useCallback(async () => {
		try {
		  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property${thisPathname}`, {
			headers: {
			  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
			},
		  });
		  if (data.status === 'success') {
			setListingDetail(data.data);
		  }
		} catch (error) {
		  console.error(error);
		}
	  },[thisPathname]) 


	useEffect(()=>{
		fetchListingDetails()
	},[fetchListingDetails])

	

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				{/* <div className="flex items-center justify-between">
					<Badge name="Wooden house" />
					<LikeSaveBtns />
				</div> */}

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					Snowy Mist Homestay-Aut
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<div className="flex items-center">
						<MapPinIcon className="h-5 w-5" />
						<span className="ml-1">  Village Shikari, Panarsa Khanahal Road Aut.</span>
					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							Tek Singh
						</span>
					</span>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
				<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-6 w-6"
						>
							<path
								d="M3 22H21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 22V6C4 2.69067 4.78933 2 8.57143 2H15.4286C19.2107 2 20 2.69067 20 6V22"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M13.92 11.7592V9.85424C13.92 8.8324 13.0604 8.00403 12 8.00403C10.9396 8.00403 10.08 8.8324 10.08 9.85424V11.7592M15 14.0843C15 15.6952 13.6462 17.004 12 17.004C10.3538 17.004 9 15.6952 9 14.0843C9 12.374 10.3538 11.0739 12 11.0739C13.6462 11.0739 15 12.374 15 14.0843Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<span className=" ">
							<span className="hidden sm:inline-block">No. of rooms: </span> 4
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<UsersIcon className="h-6 w-6" />
						<span className="">
							<span className="hidden sm:inline-block">Total Capacity:</span> 6
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-6 w-6"
						>
							<path
								d="M22 17.5H2"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<span className=" ">
							6 <span className="hidden sm:inline-block">beds</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-6 w-6"
						>
							<path
								d="M6 20L5 21M18 20L19 21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M2 12H22"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M8 6L10.5 4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<span className=" ">
							3 <span className="hidden sm:inline-block">baths</span>
						</span>
					</div>
					
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
				<div className="text-neutral-600 dark:text-neutral-300">
					<span>
						This homestay is located in a tiny village Shikari in Himachal known for its lush green valley and the snow capped mountain views. Parashar lake is just 7 km from here. 
						This place is ideal if you want to experience local pahadi cuisine, festivals, art and craft, folk music &amp; dance, and ancient temples.&nbsp;
					</span>
					<br />
					<br />
					<span>
					This charming homestay is on top of the mountain that&nbsp; spans over the ground floor which&nbsp; provides four spacious&nbsp; rooms with attached &amp; common bathrooms. All rooms are available at the ground floor with two classic rooms with a common bathroom (outside the room) &amp; two family rooms with an attached bathroom. Rooms are equipped with a traditional outlook with amenities like wooden almirah &amp; window sitting . The focal point of the rooms are the traditional style windows covering the landscape of the high rise&nbsp; lush green valley called Deodar tree, the amazing landscape view is definitely going to escape you from your busy schedule to the less formal life of Pahadi &amp; during winter it is all&nbsp; surrounded with the snow capped huge mountains of deodar tree will drive you through the fantasy world of harry potter. 
					</span>
				</div>
			</div>
		)
	}

	// amenities 
	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Facilities </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's amenities and services`}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{Amenities_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<item.icon className="h-6 w-6" />
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>

				{/* ----- */}
				<div className="w-14 border-b border-neutral-200"></div>
				<div>
					<ButtonSecondary onClick={openModalAmenities}>
						View more 20 amenities
					</ButtonSecondary>
				</div>
				{renderModalAmenities()}
			</div>
		)
	}

	const renderModalAmenities = () => {
		return (
			<Dialog
				open={isOpenModalAmenities}
				onClose={closeModalAmenities}
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
								Amenities
							</DialogTitle>
							<span className="absolute left-3 top-3">
								<ButtonClose onClick={closeModalAmenities} />
							</span>
						</div>

						<div className="hiddenScrollbar flex-1 divide-y divide-neutral-200 overflow-y-auto px-8 text-neutral-700 dark:divide-neutral-700 dark:text-neutral-300">
							{Amenities_demos.filter((_, i) => i < 1212).map((item) => (
								<div
									key={item.name}
									className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
								>
									<item.icon className="h-6 w-6" />
									<span>{item.name}</span>
								</div>
							))}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>₹219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							Kevin Francis
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 places</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-600 dark:text-neutral-300">
				You will be hosted by Tek Singh  who is the owner of this house and running this homestay since 2021. He lives 500m from the homestay & he is full time available there to ensure a warm and welcoming stay for the guests. 
				</span>

				{/* info */}
				<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>Joined in March 2016</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<span>Response rate - 100%</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span>Fast response - within a few hours</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">See host profile</ButtonSecondary>
				</div>
			</div>
		)
	}

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">How to reach</h2>
					<div className="text-neutral-600 dark:text-neutral-300">
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							If you are coming from Delhi towards Manali, after around 5 kms from Aut take Panarsa-Khanahal Road. The homestay is about 28km on Nau Mata Bhagwati road till homestay. The nearest airport is in Bhuntar which is 42 km but has limited flights. The best way to reach is via Delhi. Take the Himachal Tourism (HPTDC) overnight Volvo bus to Kullu. Get off at Aut from where you can take a taxi for the homestay.&nbsp;
						</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe>
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				{/* <div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Refund 50% of the booking value when customers cancel the room
						within 48 hours after successful booking and 14 days before the
						check-in time. <br />
						Then, cancel the room 14 days before the check-in time, get a 50%
						refund of the total amount paid (minus the service fee).
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" /> */}

				{/* CONTENT */}
				{/* <div>
					<h4 className="text-lg font-semibold">Check-in time</h4>
					<div className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
						<div className="flex justify-between space-x-10 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
							<span>Check-in</span>
							<span>08:00 am - 12:00 am</span>
						</div>
						<div className="flex justify-between space-x-10 p-3">
							<span>Check-out</span>
							<span>02:00 pm - 04:00 pm</span>
						</div>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" /> */}

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Special Note</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Ban and I will work together to keep the landscape and
								environment green and clean by not littering, not using
								stimulants and respecting people around.
							</li>
							<li>Do not sing karaoke past 11:30</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	const renderSection9 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Child Policy</h2>

				{/* CONTENT */}
				<div>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Up to 6 years: Complimentary (no extra bed)
							</li>
							<li>7-12 years : 50% (with extra bed)</li>
						</ul>
					</div>
					<br />
					<i className="block text-neutral-600 dark:text-neutral-300">
						What you pay for a homestay, brings a direct socio-economic benefit to locals. Be proud by not asking for a discount.
					</i>
				</div>
			</div>
		)
	}

	const renderSection10 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Foods</h2>

				{/* CONTENT */}
				<div>
					<span className="block text-neutral-600 dark:text-neutral-300">
						Host serves simple yet delicious traditional homemade food. You can enjoy mandiyali dham, kullvi siddu, makke ki roti &amp; sarason ka saag, patrodu, Himachali rajmah with rice etc. Non-vegetarian dish can also be prepared on prior notice of two to three hours.&nbsp;
					</span>
				</div>
			</div>
		)
	}

	const renderSection11 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Activities </h2>
				</div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{Activities_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection12 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Local Attractions </h2>
				</div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{Local_attraction_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>
			</div>
		)
	}


	const renderSection13 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Excursions </h2>
				</div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{Excursions_attraction_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSidebar = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
					₹119
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput className="z-[11] flex-1" />
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>₹119 x 3 night</span>
						<span>₹357</span>
					</div>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>Service charge</span>
						<span>₹0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>₹199</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl mt-3">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={PHOTOS[0]}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 3 ? 'hidden sm:block' : ''
							}`}
						>
							<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={item || ''}
									alt=""
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
					{renderSection7()}
					{renderSection9()}
					{renderSection3()}
					{/* {renderSection4()} */}
					<SectionDateRange />
					{renderSection10()}
					{renderSection11()}
					{renderSection12()}
					{renderSection13()}
					{renderSection5()}
					{renderSection6()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage
