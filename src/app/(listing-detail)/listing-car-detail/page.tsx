'use client'

import React, { FC } from 'react'
import {
	ArrowRightIcon,
	CheckCircleIcon,
	MapPinIcon,
	Squares2X2Icon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import Image from 'next/image'
import { Amenities_demos, includes_demo, PHOTOS } from './constant'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import { usePathname, useRouter } from 'next/navigation'
import SectionDateRange from '../SectionDateRange'
import RentalCarDatesRangeInput from './RentalCarDatesRangeInput'
import { Route } from 'next'
import {
	Backpack03Icon,
	SeatSelectorIcon,
	Settings03Icon,
} from '@/components/Icons'

export interface ListingCarDetailPageProps {}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({}) => {
	// USE STATE

	const thisPathname = usePathname()
	const router = useRouter()

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge color="pink" name="BMW car" />
					<LikeSaveBtns />
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					BMW 3 Series Sedan
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<div className="flex items-center">
						<MapPinIcon className="h-4 w-4" />
						<span className="ml-1"> Tokyo, Jappan</span>
					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Car owner{' '}
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
						<SeatSelectorIcon className="h-5 w-5" />
						<span className="">4 seats</span>
					</div>
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 sm:text-left">
						<Settings03Icon className="h-5 w-5" />
						<span className=""> Auto gearbox</span>
					</div>
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 sm:text-left">
						<Backpack03Icon className="h-5 w-5" />
						<span className=""> 2 bags</span>
					</div>
				</div>
			</div>
		)
	}

	//
	const renderSectionTienIch = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">
						Vehicle parameters & utilities{' '}
					</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Questions are at the heart of making things great.
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-x-10 gap-y-6 text-sm text-neutral-700 dark:text-neutral-300 lg:grid-cols-2">
					{/* TIEN ICH 1 */}
					{Amenities_demos.map((item, index) => (
						<div key={index} className="flex items-center space-x-4">
							<div className="w-10 flex-shrink-0">
								<Image src={item.icon} alt="" />
							</div>
							<span>{item.name}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Car descriptions</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<p>
						Until the all-new TUCSON hits the dealer showrooms you can check it
						out in our Showroom Walkaround video. Watch the video and join our
						product specialist as he gives you an up-close look of our latest
						SUV
						<br />
						<br />
						Questions are at the heart of making things great. Watch our
						celebrity-filled TV ad and you’ll see that when we say “everything,”
						we mean everything.
					</p>
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Include </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Included in the price
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 lg:grid-cols-2">
					{includes_demo
						.filter((_, i) => i < 12)
						.map((item) => (
							<div key={item.name} className="flex space-x-3">
								<CheckCircleIcon className="mt-px h-6 w-6 flex-shrink-0" />
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
				<h2 className="text-2xl font-semibold">Car Owner</h2>
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
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Lock in this fantastic price today, cancel free of charge anytime.
						Reserve now and pay at pick-up.
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Special Note</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						We asked ourselves, “How can we make the dash not only look better,
						but also give the driver a better look outside?” The unexpected
						answer is having no hood above the available 10.25-inch digital
						instrument cluster...
					</span>
				</div>
			</div>
		)
	}

	const renderSidebarPrice = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						$19
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/day
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				<form className="rounded-2xl border border-neutral-200 dark:border-neutral-700">
					<RentalCarDatesRangeInput />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>$19 x 3 day</span>
						<span>$57</span>
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

	const renderSidebarDetail = () => {
		return (
			<div className="listingSection__wrap lg:shadow-xl">
				<span className="block text-2xl font-semibold">
					Pick up and drop off
				</span>
				<div className="mt-8 flex">
					<div className="flex flex-shrink-0 flex-col items-center py-2">
						<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
						<span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
						<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
					</div>
					<div className="ml-4 space-y-14 text-sm">
						<div className="flex flex-col space-y-2">
							<span className="text-neutral-500 dark:text-neutral-400">
								Monday, August 12 · 10:00
							</span>
							<span className="font-semibold">
								Saint Petersburg City Center
							</span>
						</div>
						<div className="flex flex-col space-y-2">
							<span className="text-neutral-500 dark:text-neutral-400">
								Monday, August 16 · 10:00
							</span>
							<span className="font-semibold">
								Saint Petersburg City Center
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`nc-ListingCarDetailPage`}>
			SINGLE HEADER
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
					<div
						className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							src={PHOTOS[0]}
							alt="photo 0"
							className="rounded-md object-cover sm:rounded-xl"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>

					{/*  */}
					<div
						className="relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={PHOTOS[1]}
							alt="photo 1"
							sizes="400px"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>

					{/*  */}
					{PHOTOS.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 2 ? 'block' : ''
							}`}
						>
							<div className="aspect-h-3 aspect-w-4">
								<Image
									fill
									className="h-full w-full rounded-md object-cover sm:rounded-xl"
									src={item || ''}
									alt="photos"
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
					<div className="block lg:hidden">{renderSidebarDetail()}</div>
					{renderSectionTienIch()}
					{renderSection2()}
					{renderSection3()}
					<SectionDateRange />

					{renderSection5()}
					{renderSection6()}
					{renderSection7()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 block flex-grow lg:mt-0">
					{renderSidebarDetail()}
					<div className="sticky top-28 mt-10 hidden lg:block">
						{renderSidebarPrice()}
					</div>
				</div>
			</main>
		</div>
	)
}

export default ListingCarDetailPage
