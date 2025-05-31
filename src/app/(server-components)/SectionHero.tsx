'use client'
import {useState,useEffect} from 'react'
import React, { FC } from 'react'
import imagePng from '@/images/hero-right.png'
import HeroSearchForm from '../(client-components)/(HeroSearchForm)/HeroSearchForm'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import axios from 'axios'


export interface SectionHeroProps {
	className?: string
}

const SectionHero: FC<SectionHeroProps> = ({ className = '' }) => {

	const [bannerData, setBannerData] = useState<any>({})

	const fetchBannerData = async() => {
		try {

			const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`,{
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
				},
			})
			if(data.status === 'success'){
				setBannerData(data.data.banner)
			}

		} catch (error) {
			console.error('Error fetching banner data:', error);
		}
	}

	useEffect(()=>{
		fetchBannerData()
		
	},[])
	
	return (
		<div
			className={`nc-SectionHero relative flex flex-col-reverse lg:flex-col ${className}`}
		>
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="flex flex-shrink-0 flex-col items-start space-y-8 pb-14 sm:space-y-10 lg:mr-10 lg:w-1/2 lg:pb-64 xl:mr-0 xl:pr-14">
					<h2 className="text-3xl font-bold !leading-[114%] md:text-4xl xl:text-6xl">
						{bannerData?.heading}
					</h2>
					<span className="text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
						{bannerData?.subheading}
					</span>
					{/* <ButtonPrimary href="/listing-stay-map" sizeClass="px-5 py-4 sm:px-7">
						Start your Homestays
					</ButtonPrimary> */}
				</div>
				<div className="flex-grow -mt-[3rem]">
					<Image className="w-full" src={bannerData?.image_url || '/heroRight.webp'} width={1000} height={1000} alt="hero" priority />
				</div>
			</div>

			{/* <div className="z-10 mb-12 hidden w-full lg:-mt-40 lg:mb-0 lg:block xl:-mt-44">
				<HeroSearchForm />
			</div> */}
		</div>
	)
}

export default SectionHero
