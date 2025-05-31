'use client'

import { FC, useState } from 'react'
import { DEMO_CAR_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import CarCardH from '@/components/CarCardH'
import MapContainer from '@/components/MapContainer'
import { MapIcon } from '@heroicons/react/24/outline'

const DEMO_CARS = DEMO_CAR_LISTINGS.filter((_, i) => i < 12)

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
	const [showFullMapFixed, setShowFullMapFixed] = useState(false)

	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full flex-shrink-0 xl:w-[780px] xl:px-8 2xl:w-[880px]">
					<Heading2
						heading="Cars in Tokyo"
						subHeading={
							<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
								233 cars
								<span className="mx-2">·</span>
								Aug 12 - 18
							</span>
						}
					/>
					<div className="mb-8 lg:mb-11">
						<TabFilters />
					</div>
					<div className="grid grid-cols-1 gap-8">
						{DEMO_CARS.map((item) => (
							<div
								key={item.id}
								onMouseEnter={() => setCurrentHoverID((_) => item.id)}
								onMouseLeave={() => setCurrentHoverID((_) => -1)}
							>
								<CarCardH data={item} />
							</div>
						))}
					</div>
					<div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div>
				</div>

				<div
					className="fixed bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl xl:hidden"
					onClick={() => setShowFullMapFixed(true)}
				>
					<MapIcon className="h-5 w-5" />
					<span>Show map</span>
				</div>

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-grow ${
						showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
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
							DEMO_DATA={DEMO_CARS}
							listingType="car"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionGridHasMap
