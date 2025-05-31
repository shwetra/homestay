import React, { FC } from 'react'
import imagePng from '@/images/hero-right-3.png'
import Image from 'next/image'
import HeroRealEstateSearchForm from '../(client-components)/(HeroSearchForm)/(real-estate-search-form)/HeroRealEstateSearchForm'
import { HomeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export interface SectionHero2ArchivePageProps {
	className?: string
}

const SectionHero2ArchivePage: FC<SectionHero2ArchivePageProps> = ({
	className = '',
}) => {
	return (
		<div
			className={`nc-SectionHero2ArchivePage relative ${className}`}
			data-nc-id="SectionHero2ArchivePage"
		>
			<div className="absolute inset-y-0 right-0 w-5/6 flex-grow xl:w-3/4">
				<Image fill className="object-cover" src={imagePng} alt="hero" />
			</div>
			<div className="relative py-14">
				<div className="relative inline-flex">
					<div className="absolute inset-y-0 right-10 w-screen bg-primary-500 md:right-32"></div>
					<div className="relative inline-flex max-w-3xl flex-shrink-0 flex-col items-start space-y-8 py-16 text-white sm:space-y-10 sm:py-20">
						<h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl">
							Tokyo, Jappan
						</h2>
						<div className="flex items-center text-base md:text-lg">
							<MapPinIcon className="h-5 w-5" />
							<span className="ml-2.5">Jappan </span>
							<span className="mx-5"></span>
							<HomeIcon className="h-5 w-5" />
							<span className="ml-2.5">112 properties</span>
						</div>
					</div>
				</div>
				<div className="mt-10 hidden w-full lg:block">
					<HeroRealEstateSearchForm />
				</div>
			</div>
		</div>
	)
}

export default SectionHero2ArchivePage
