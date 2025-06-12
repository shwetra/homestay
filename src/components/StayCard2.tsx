'use client'
import React, { FC, useCallback, useEffect, useState } from 'react'
import GallerySlider from '@/components/GallerySlider'
	import GallerySlider2 from '@/components/GallerySlider2'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import Link from 'next/link'
import axios from 'axios'
import { useImages } from '@/app/contextApi/ImageContext'
import { toast } from 'react-toastify'

export interface StayCard2Props {
	className?: string
	data?: any //StayDataType
	size?: 'default' | 'small',
	toSlice?: number,
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const StayCard2: FC<StayCard2Props> = ({
	size = 'default',
	className = '',
	data = DEMO_DATA,
	toSlice,
}) => {
	const {
		galleryImgs,
		listingCategory,
		address,
		title,
		bedrooms,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
		properties,
		coverPhoto
	} = data

	const [isTodayWeekend, setIsTodayWeekend] = useState(false)
	const [currentSlug, setCurrentSlug] = useState<String>('')
	const [toggleLike, setToggleLike] = useState<boolean>(false)
	const { loggedUser, token } = useImages()
	const [favouriteProperties, setFavouriteProperties] = useState<any>()

	function isWeekend() {
		const today = new Date();
		const day = today.getDay();

		if (day === 0 || day === 6) {
			setIsTodayWeekend(true)
		}
	}

	useEffect(() => {
		isWeekend()
	}, [])


	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				<GallerySlider2
					uniqueID={`StayCard2_${id}`}
					ratioClass="aspect-w-12 aspect-h-11"
					coverPhoto={properties[0]?.cover_photos}
					galleryImgs={properties[0]?.property_photos}
					imageClass="rounded-lg"
					href="/listing-stay-detail"
				/>
				<BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
				{saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
				<div className="space-y-2">
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{properties[0]?.bedrooms} bedroom · {properties[0].beds} bed
					</span>
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === 'default' ? 'text-base' : 'text-base'
								}`}
						>
							<span className="line-clamp-1">{properties[0].name}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
						{size === 'default' && (
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						)}
						<span className="">{properties[0]?.property_address?.city}</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{properties[0]?.property_price?.price}
						{` `}
						{size === 'default' && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								/night
							</span>
						)}
					</span>
					<StartRating
						reviewCount={properties[0].reviews_count}
						point={properties[0].avg_rating}
					/>
					{/* {properties[0].reviews_count && (
						<StartRating reviewCount={properties[0].reviews_count} point={properties[0].avg_rating} />
					)} */}
				</div>
			</div>
		)
	}

	const fetchListingDetails = async () => {
		try {
			if (!currentSlug) return;
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${currentSlug}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			});
			if (data.status === 'success') {
				favouriteProperty(data?.data?.result?.id, loggedUser?.id)
			}
		} catch (error) {
			console.error(error);
		}
	}


	const favouriteProperty = async (property_id: String, user_id: String) => {
		try {
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/toggle-favourite`, { property_id, user_id }, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			})
			if (data.status === 'success') {
				if (data?.data?.status === 'Active') {
					toast.success("Added to favourite property")
				} else if (data?.data?.status === 'Inactive') {
					toast.success("Removed from favourite property")
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchFavouriteProperties = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/favourites-list?user_id=${loggedUser?.id}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
					'Authorization': `Bearer ${token}`,
				},
			});
			if (data.status === 'success') {
				setFavouriteProperties(data?.data)
				console.log("favouritePorperiteis2::", data?.data)
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchFavouriteProperties()
	}, [])

	useEffect(() => {
		if (currentSlug) {
			fetchListingDetails();
		}
	}, [currentSlug, toggleLike])


	return (
		// <div className={`nc-StayCard2 group relative ${className}`}>
		// 	{renderSliderGallery()}
		// 	<Link href={"/listing-stay-detail"}>{renderContent()}</Link>
		// </div>

		properties?.filter((item:any)=> item.recomended === 1).slice(0, toSlice).map((item: any, index: any) => (
			<div className={`nc-StayCard2 group relative ${className}`} key={item?.id}>

				<div className="relative w-full">
					<GallerySlider2
						uniqueID={`StayCard2_${id}`}
						ratioClass="aspect-w-6 aspect-h-4"
						galleryImgs={item?.property_photos}
						imageClass="rounded-lg"
						href={`/property/${item?.slug}`}
					/>
					<BtnLikeIcon
						// isLiked={like}
						isLiked={favouriteProperties?.some((property: any) => property.id === item?.id)}
						className="absolute right-3 top-3 z-[1]"
						onClick={() => { setCurrentSlug(item?.slug), setToggleLike(!toggleLike) }}
					/>
					{/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
				</div>

				<Link href={`/property/${item?.slug}`}>
					<div
						className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}
					>
						<div className="space-y-2">
							<span className="text-sm text-neutral-500 dark:text-neutral-400">
								{item?.bedrooms} {item?.bedrooms > 1 ? 'bedrooms' : 'bedroom'} · {item?.beds} {item?.beds > 1 ? 'beds' : 'bed'}
							</span>
							<div className="flex items-center space-x-2">
								{/* {isAds && <Badge name="ADS" color="green" />} */}
								<h2
									className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === 'default' ? 'text-base' : 'text-base'
										}`}
								>
									<span className="line-clamp-1">{item?.name}</span>
								</h2>
							</div>
							<div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
								{size === 'default' && (
									<svg
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								)}
								<span className="">{item?.property_address?.city}, {item?.property_address?.state}</span>
							</div>
						</div>
						<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
						<div className="flex items-center justify-between">
							<span className="text-base font-semibold">
								{/* {isTodayWeekend === false ? item?.property_price?.price : item?.property_price?.weekend_price} */}
								{item?.min_room_price}
								{` `}
								{size === 'default' && (
									<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
										/day
									</span>
								)}
							</span>
							<StartRating
								reviewCount={item?.reviews_count}
								point={item?.avg_rating}
							/>
							{/* {properties[0].reviews_count && (
							<StartRating reviewCount={properties[0].reviews_count} point={properties[0].avg_rating} />
						)} */}
						</div>
					</div>
				</Link>
			</div>
		))
	)
}

export default StayCard2
