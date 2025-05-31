import React, { FC, ReactNode } from 'react'
import imagePng from '@/images/hero-right2.png'
import HeroSearchForm, {
	SearchTab,
} from '../(client-components)/(HeroSearchForm)/HeroSearchForm'
import Image, { StaticImageData } from 'next/image'
import { HomeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export interface SectionHeroArchivePageProps {
	className?: string
	listingType?: ReactNode
	currentPage: 'Stays' | 'Experiences' | 'Cars' | 'Flights'
	currentTab: SearchTab
	rightImage?: StaticImageData
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
	className = '',
	listingType,
	currentPage,
	currentTab,
	rightImage = imagePng,
}) => {
	return (
		<div
			className={`nc-SectionHeroArchivePage relative flex flex-col ${className}`}
			data-nc-id="SectionHeroArchivePage"
		>
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="flex flex-shrink-0 flex-col items-start space-y-6 pb-14 lg:mr-10 lg:w-1/2 lg:space-y-10 lg:pb-64 xl:mr-0 xl:pb-80 xl:pr-14">
					<h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl">
						Tokyo, Jappan
					</h2>
					<div className="flex items-center text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
						<MapPinIcon className="h-5 w-5" />
						<span className="ml-2.5">Jappan </span>
						<span className="mx-5"></span>
						{listingType ? (
							listingType
						) : (
							<>
								<HomeIcon className="h-5 w-5" />
								<span className="ml-2.5">112 properties</span>
							</>
						)}
					</div>
				</div>
				<div className="flex-grow">
					<Image
						className="w-full"
						src={rightImage}
						alt="hero"
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
					/>
				</div>
			</div>

			<div className="hidden w-full lg:flow-root">
				<div className="z-10 w-full lg:-mt-40 xl:-mt-56">
					<HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
				</div>
			</div>
		</div>
	)
}

export default SectionHeroArchivePage
