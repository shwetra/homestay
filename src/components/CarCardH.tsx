import React, { FC } from 'react'
import { DEMO_CAR_LISTINGS } from '@/data/listings'
import { CarDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import Avatar from '@/shared/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'

export interface CarCardHProps {
	className?: string
	data?: CarDataType
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0]

const CarCardH: FC<CarCardHProps> = ({ className = '', data = DEMO_DATA }) => {
	const {
		address,
		title,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		author,
		featuredImage,
	} = data
	console.log(DEMO_DATA);
	const renderSliderGallery = () => {
		return (
			<div className="relative flex w-full flex-shrink-0 items-center justify-center border-r border-neutral-200/80 dark:border-neutral-700 md:w-72">
				<div className="w-full py-5 sm:py-0">
					<Image
						alt=""
						className="w-full"
						src={featuredImage}
						sizes="(max-width: 640px) 100vw, 300px"
					/>
				</div>
				<BtnLikeIcon isLiked={like} className="absolute right-3 top-3" />
				{saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className="flex flex-grow flex-col p-3 sm:p-5">
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2 className="text-xl font-semibold capitalize">
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
						<StartRating reviewCount={reviewCount} point={reviewStart} />
						<span>· </span>
						<div className="flex items-center">
							<span className="hidden text-base sm:inline-block">
								<MapPinIcon className="h-4 w-4" />
							</span>
							<span className="line-clamp-1 sm:ml-2"> {address}</span>
						</div>
					</div>
				</div>
				<div className="my-4 hidden w-14 border-b border-neutral-200/80 dark:border-neutral-700 sm:block"></div>
				{/* SHOW MOBILE */}
				<div className="mt-4 flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 sm:mt-0 sm:hidden">
					<span>4 seats</span>
					<span>· </span>
					<span>Auto gearbox</span>
					<span>· </span>
					<span>4 seats</span>
				</div>
				{/* SHOW DESK */}
				<div className="hidden items-center space-x-8 sm:flex">
					{/* --- */}
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-4 w-4"
						>
							<path
								d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinejoin="round"
							/>
							<path
								d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							4 seats
						</span>
					</div>
					{/* --- */}
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-4 w-4"
						>
							<path
								d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M20.7906 9.15201C21.5969 10.5418 22 11.2366 22 12C22 12.7634 21.5969 13.4582 20.7906 14.848L18.8669 18.1638C18.0638 19.548 17.6623 20.2402 17.0019 20.6201C16.3416 21 15.5402 21 13.9373 21L10.0627 21C8.45982 21 7.6584 21 6.99807 20.6201C6.33774 20.2402 5.93619 19.548 5.13311 18.1638L3.20942 14.848C2.40314 13.4582 2 12.7634 2 12C2 11.2366 2.40314 10.5418 3.20942 9.152L5.13311 5.83621C5.93619 4.45196 6.33774 3.75984 6.99807 3.37992C7.6584 3 8.45982 3 10.0627 3L13.9373 3C15.5402 3 16.3416 3 17.0019 3.37992C17.6623 3.75984 18.0638 4.45197 18.8669 5.83622L20.7906 9.15201Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							Auto gearbox
						</span>
					</div>
					{/* --- */}
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={'currentColor'}
							fill={'none'}
							className="h-4 w-4"
						>
							<path
								d="M7 12V21M17 12V21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M3 12H21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M2.5 13.75C2.5 10.0966 2.5 8.26992 3.61299 7.13496C4.72599 6 6.51733 6 10.1 6H13.9C17.4827 6 19.274 6 20.387 7.13496C21.5 8.26992 21.5 10.0966 21.5 13.75C21.5 17.4034 21.5 19.2301 20.387 20.365C19.274 21.5 17.4827 21.5 13.9 21.5H10.1C6.51733 21.5 4.72599 21.5 3.61299 20.365C2.5 19.2301 2.5 17.4034 2.5 13.75Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M16.5 6L16.4007 5.69094C15.9056 4.15089 15.6581 3.38087 15.0689 2.94043C14.4796 2.5 13.697 2.5 12.1316 2.5H11.8684C10.303 2.5 9.52036 2.5 8.93111 2.94043C8.34186 3.38087 8.09436 4.15089 7.59934 5.69094L7.5 6"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							2 bags
						</span>
					</div>
				</div>

				<div className="my-4 w-14 border-b border-neutral-200/80 dark:border-neutral-700"></div>
				<div className="flex items-end justify-between">
					<div className="flex items-center space-x-3 text-sm text-neutral-700 dark:text-neutral-300">
						<Avatar imgUrl={author.avatar} userName={author.displayName} />
						<span className="hidden sm:inline-block">
							<span className="hidden sm:inline">Car owner </span>{' '}
							{author.displayName}
						</span>
					</div>
					<span className="text-lg font-semibold text-secondary-700">
						{price}
						{` `}
						<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
							/day
						</span>
					</span>
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-CarCardH group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
		>
			<Link href={href} className="flex flex-col md:flex-row">
				{renderSliderGallery()}
				{renderContent()}
			</Link>
		</div>
	)
}

export default CarCardH
