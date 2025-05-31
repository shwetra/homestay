import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import { StayDataType } from '@/data/types'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'

export interface PropertyCardHProps {
	className?: string
	data?: StayDataType
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const PropertyCardH: FC<PropertyCardHProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	const {
		galleryImgs,
		title,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
	} = data

	const renderSliderGallery = () => {
		return (
			<div className="w-full flex-shrink-0 p-3 sm:w-64">
				<GallerySlider
					ratioClass="aspect-w-1 aspect-h-1"
					galleryImgs={galleryImgs}
					className="h-full w-full overflow-hidden rounded-2xl"
					uniqueID={`PropertyCardH_${id}`}
					href={href}
				/>

				{saleOff && (
					<SaleOffBadge className="absolute left-5 top-5 !bg-orange-500" />
				)}
			</div>
		)
	}

	const renderTienIch = () => {
		return (
			<div className="inline-grid grid-cols-3 gap-2">
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
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
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						6 bedsss
					</span>
				</div>

				{/* ---- */}
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
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
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						3 baths
					</span>
				</div>

				{/* ---- */}
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
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
								d="M4 2V4M22 20H20M16.5 20H10C7.17157 20 5.75736 20 4.87868 19.1213C4 18.2426 4 16.8284 4 14V7.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M20 22L20 12C20 8.22877 20 6.34315 18.8284 5.17158C17.6569 4 15.7712 4 12 4L2 4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						1200 Sq. Fit
					</span>
				</div>
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className="flex flex-grow flex-col items-start p-3 sm:pr-6">
				<div className="w-full space-y-4">
					<div className="inline-flex space-x-3">
						<Badge
							name={
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width={24}
										height={24}
										color={'currentColor'}
										fill={'none'}
										className="h-3 w-3"
									>
										<path
											d="M20.5 5.5C20.5 7.15685 19.1569 8.5 17.5 8.5C15.8431 8.5 14.5 7.15685 14.5 5.5C14.5 3.84315 15.8431 2.5 17.5 2.5C19.1569 2.5 20.5 3.84315 20.5 5.5Z"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
										<path
											d="M8.5 11.5C8.5 13.1569 7.15685 14.5 5.5 14.5C3.84315 14.5 2.5 13.1569 2.5 11.5C2.5 9.84315 3.84315 8.5 5.5 8.5C7.15685 8.5 8.5 9.84315 8.5 11.5Z"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
										<path
											d="M21.5 18.5C21.5 20.1569 20.1569 21.5 18.5 21.5C16.8431 21.5 15.5 20.1569 15.5 18.5C15.5 16.8431 16.8431 15.5 18.5 15.5C20.1569 15.5 21.5 16.8431 21.5 18.5Z"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
										<path
											d="M14.5348 4.58109C14.1554 4.52765 13.7677 4.5 13.3733 4.5C10.2974 4.5 7.62058 6.18227 6.24054 8.66317M19.7131 7.49453C20.8311 8.86497 21.5 10.6056 21.5 12.5C21.5 13.8758 21.1472 15.1705 20.5258 16.3012M15.8816 20.1117C15.0917 20.3638 14.2486 20.5 13.3733 20.5C9.58287 20.5 6.39853 17.9454 5.5 14.4898"
											stroke="currentColor"
											strokeWidth="1.5"
										/>
									</svg>
									<span className="ml-1">4 Network</span>
								</div>
							}
						/>
						<Badge
							name={
								<div className="flex items-center">
									<UserIcon className="h-3 w-3" />
									<span className="ml-1">Family</span>
								</div>
							}
							color="yellow"
						/>
					</div>
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2 className="text-lg font-medium capitalize">
							<span className="line-clamp-2">{title}</span>
						</h2>
					</div>
					{renderTienIch()}
					<div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700"></div>
					<div className="flex w-full items-end justify-between">
						<StartRating reviewCount={reviewCount} point={reviewStart} />
						<span className="flex items-center justify-center rounded-lg border-2 border-secondary-500 px-2.5 py-1.5 text-sm font-medium leading-none text-secondary-500">
							{`${price},000`}
						</span>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-PropertyCardH group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
		>
			<Link href={href} className="absolute inset-0"></Link>
			<div className="flex h-full w-full flex-col sm:flex-row sm:items-center">
				{renderSliderGallery()}
				{renderContent()}
			</div>
			<BtnLikeIcon
				colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600 dark:text-neutral-400`}
				isLiked={like}
				className="absolute right-5 top-5 sm:right-3 sm:top-3"
			/>
		</div>
	)
}

export default PropertyCardH
