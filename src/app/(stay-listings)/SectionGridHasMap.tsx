'use client'

import { FC, useState } from 'react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import MapContainer from '@/components/MapContainer'
import { MapIcon } from '@heroicons/react/24/outline'
import StayCard2Copy from '@/components/StayCard2Copy'
import ButtonPrimary from '@/shared/ButtonPrimary'

const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)
export interface SectionGridHasMapProps {
	stayListings: any
	city?: any
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ stayListings, city }) => {
	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
	const [showFullMapFixed, setShowFullMapFixed] = useState(false)

	const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false)
	const [toSlice, setToSlice] = useState<number>(6)

	const handleShowMore = () => {
		setShowMoreLoading(true);

		setTimeout(() => {
			setToSlice(prev => prev + 6);
			setShowMoreLoading(false);
		}, 1000); // simulate 1 second loading
	};

	// convert state name to valid syntax 
	const renderCity = (city: any): string => {
        if (!city) return "";
        return city.replace(/%20/g, " ") // Replace %20 with space
        .split(" ") // Split into words
        .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" ");
      };


	const hasAnyProperties = stayListings?.length > 0;


	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
					<Heading2 heading={`Stays in ${renderCity(city)}` || 'your location'} />
					<div className="mb-8 lg:mb-11">
						<details className='hidden sm:block'>
							<summary className='mb-5 border-2 px-4 py-2 rounded-full w-fit'>Filters:</summary>
							{/* <TabFilters /> */}
						</details>
						<div className='sm:hidden'>
							{/* <TabFilters /> */}
						</div>
					</div>
					{
						hasAnyProperties &&
						<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6">
							{stayListings?.slice(0, toSlice).map((item: any) => (
								<div
									key={item.id}
									onMouseEnter={() => setCurrentHoverID((_) => item.id)}
									onMouseLeave={() => setCurrentHoverID((_) => -1)}
								>
									<StayCard2Copy data={item} />
								</div>
							))}
						</div>

					}

					{
						stayListings?.length === 0 && "No Properties Found"
					}

					{/* Load more button  */}
					{stayListings?.length > toSlice &&
						<div className="mt-16 flex items-center justify-center">
							<ButtonPrimary loading={showMoreLoading} onClick={handleShowMore}>Show more</ButtonPrimary>
						</div>}


				</div>

				{!showFullMapFixed && (
					<div
						className={`fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl md:bottom-8 xl:hidden`}
						onClick={() => setShowFullMapFixed(true)}
					>
						<MapIcon className="h-5 w-5" />
						<span>Show map</span>
					</div>
				)}

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-1 ${showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
						}`}
				>
					{showFullMapFixed && (
						<ButtonClose
							onClick={() => setShowFullMapFixed(false)}
							className="absolute left-3 top-3 z-50 h-10 w-10 rounded-xl bg-white shadow-lg"
						/>
					)}

					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
							currentHoverID={currentHoverID}
							DEMO_DATA={DEMO_STAYS}
							DEMO_DATA2={stayListings}
							listingType="stay"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionGridHasMap
