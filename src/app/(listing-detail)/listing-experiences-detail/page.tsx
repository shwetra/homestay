'use client'

import React, { FC, useState } from 'react'
import {
	ArrowRightIcon,
	CheckCircleIcon,
	ClockIcon,
	LanguageIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import { usePathname, useRouter } from 'next/navigation'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import StartRating from '@/components/StartRating'
import { includes_demo, PHOTOS, excludes_demo } from './constant'
import Image from 'next/image'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from '../SectionDateRange'
import { Route } from 'next'

export interface ListingExperiencesDetailPageProps {}

const ListingExperiencesDetailPage: FC<
	ListingExperiencesDetailPageProps
> = ({}) => {
	const thisPathname = usePathname()
	const router = useRouter()

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				{/* <div className="flex items-center justify-between">
					<Badge color="pink" name="Specific Tour" />
					<LikeSaveBtns />
				</div> */}

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					Dhauladhar Delights: A Journey through Kangra Valley
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<div className="flex items-center">
						<MapPinIcon className="h-5 w-5" />
						<span className="ml-1"> Chandigarh – Palampur – Dharamshala – McLeod Ganj – Naddi</span>
					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							Kevin Francis
						</span>
					</span>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 sm:text-left">
						<ClockIcon className="h-6 w-6" />
						<span className="">5N/6D</span>
					</div>
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 sm:text-left">
						<UsersIcon className="h-6 w-6" />
						<span className="">Up to 10 people</span>
					</div>
					{/* <div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 sm:text-left">
						<LanguageIcon className="h-6 w-6" />
						<span className="">English, VietNames</span>
					</div> */}
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Itinerary</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<p>
						<b>Day 1: Chandigarh to Palampur (236 km | 5 hours)</b>
						<br />
						<br />
						Kickstart your adventure with a scenic drive from Chandigarh to Palampur, where nature’s beauty unfolds at every turn. The winding roads, framed by pine forests and the sound of the river, lead you to this tea-lover’s paradise. Enjoy pitstops at roadside dhabas for Chai and Momos, and soak in the peaceful ambiance of this Himalayan retreat. Palampur is not just limited to its tea garden but many more threads that will be unlocked in this journey.
						<br />
						<br />
						<b>Day 2: Explore Palampur and around</b>
						<br />
						<br />
						Discover why Palampur is called the “Tea Capital of North India.” Walk through lush tea gardens, feel the freshness of the emerald leaves swaying gently in the breeze, visit the historic Baijnath Temple, and experience the serenity of Tashi Jong Monastery. If time allow, you may go for Paragliding at Bir-Billing. Take a stroll through local villages, enjoy local delicacies, and immerse yourself in the town’s vibrant culture surrounded by stunning vistas.
						<br />
						<br />
						<b>Day 3: Palampur to Dharamshala (33 km | 1 hour)</b>
						<br />
						<br />
						After breakfast leave for Dharamshala, where the charming and vibrant tibetan culture awaits. Visit the Dalai Lama’s temple and explore local markets showcasing the traditional culture with handcrafted souvenirs. Have a memorable outing to Tibetan cuisine at cozy cafes and enjoy the breathtaking mountain views that make you feel relaxed.
						<br />
						<br />
						<b>Day 4: Dharamshala to McLeod Ganj (6 km | 20 minutes)</b>
						<br />
						<br />
						A short 10km drive takes you to McLeod Ganj, a vibrant cultural hub. Upon arrival, visit the Tsuglagkhang Complex, the Dalai Lama’s temple, observing and enlightening yourself with the peaceful Buddhist practices. Experience the culture and hospitality by the local people where they are eager to tell their stories, walk through bustling & vibrant markets, taste authentic Tibetan dishes, and marvel at the towering Dhauladhar range.
						<br />
						<br />
						<b>Day 5: McLeod Ganj to Naddi (4 km | 15 minutes)</b>
						<br />
						<br />
						Take a serene drive to Naddi, a tranquil village offering panoramic views of the Kangra Valley. Hike of about 2km offers stunning views of the Dhauladhar mountain, walking through their trails you will find the small cottages and fields. Enjoy the warmth of local hospitality at a tea shop and capture breathtaking sunsets over the mountains. This peaceful escape is the perfect place to unwind.
						<br />
						<br />
						<b>Day 6: Naddi to Chandigarh (250 km | 5 hours)</b>
						<br />
						<br />
						As your journey concludes, cherish the memories of Kangra Valley—the enchanting landscapes, warm local interactions, and cultural discoveries. This adventure isn’t just a getaway; it’s a soulful experience that stays with you long after you return home.
						<br />
						<br />
						
					</p>
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Includes </h2>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 lg:grid-cols-2">
					{includes_demo
						.filter((_, i) => i < 12)
						.map((item) => (
							<div key={item.name} className="flex items-center space-x-3">
								<CheckCircleIcon className="mt-px h-6 w-6 flex-shrink-0" />
								<span>{item.name}</span>
							</div>
						))}
				</div>
			</div>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Excludes </h2>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
					{excludes_demo
						.filter((_, i) => i < 12)
						.map((item) => (
							<div key={item.name} className="flex items-center space-x-3">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>

								<span>{item.name}</span>
							</div>
						))}
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
					Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
					accommodation, an outdoor swimming pool, a bar, a shared lounge, a
					garden and barbecue facilities...
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
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						San Diego, CA, United States of America (SAN-San Diego Intl.)
					</span>
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
				<h2 className="text-2xl font-semibold">General rules</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Trip will be confirmed only after receiving 50% payment. The balance to be paid before the trip starts.
							</li>
							<li>Due care is taken for the safety of the client but HOI will not be responsible for any mishap/accident/injury/illness etc.</li>
							<li>If the client does not complete the trip or consume benefits included in the price, you will have no right to claim a refund.</li>
						</ul>
						<b className='text-gray-500'>When you book this trip you’re supporting sustainable travel and directly contributing to uplift the local communities and boosting their economy. </b>
					</div>
				</div>
			</div>
		)
	}

	const renderSection9 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Trip Cost</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<div className="prose sm:prose">
						<p className='text-gray-500'>Per Person: Starting <b>12,700/-</b> (Min. 4 people)</p>
					</div>
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
						$19
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/person
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
						<span>$19 x 3 adults</span>
						<span>$57</span>
					</div>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>Service charge</span>
						<span>$0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>$199</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className={`nc-ListingExperiencesDetailPage`}>
			{/* SINGLE HEADER */}
			<header className="rounded-md sm:rounded-xl mt-3">
				<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
					<div
						className="relative col-span-3 row-span-3 cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							alt="photo 1"
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={PHOTOS[0]}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{PHOTOS.filter((_, i) => i >= 1 && i < 4).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 2 ? 'block' : ''
							}`}
						>
							<div className="aspect-h-3 aspect-w-4">
								<Image
									alt="photos"
									fill
									className="h-full w-full rounded-md object-cover sm:rounded-xl"
									src={item || ''}
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

					<div
						className="absolute bottom-3 left-3 z-10 hidden cursor-pointer rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</div>
				</div>
			</header>

			{/* MAIn */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
					{/* {renderSection9()} */}
					{renderSection3()}
					{renderSection4()}
					{renderSection8()}
					<SectionDateRange />

					{renderSection5()}
					{renderSection6()}
					{renderSection7()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingExperiencesDetailPage
