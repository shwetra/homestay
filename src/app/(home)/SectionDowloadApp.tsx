import BackgroundSection from '@/components/BackgroundSection'
import React from 'react'
import appSvg1 from '@/images/appSvg1.png'
import appSvg2 from '@/images/appSvg2.png'
import appRightImgTree from '@/images/appRightImgTree.png'
import dowloadAppBGPng from '@/images/dowloadAppBG.png'
import appRightImg from '@/images/appRightImg.png'
import btnIosPng from '@/images/btn-ios.png'
import btnAndroidPng from '@/images/btn-android.png'
import Image from 'next/image'

const SectionDowloadApp = () => {
	return (
		<div className="relative pb-0 pt-24 lg:py-32 xl:py-40 2xl:py-48">
			<BackgroundSection className="bg-neutral-100 bg-opacity-80 dark:bg-opacity-100">
				<Image
					className="absolute inset-0 h-full w-full rounded-3xl object-cover object-right"
					src={dowloadAppBGPng}
					alt="dowloadAppPng"
				/>

				<div className="absolute bottom-0 right-0 hidden max-w-xl overflow-hidden rounded-3xl lg:block xl:max-w-2xl">
					<Image src={appRightImg} alt="" />
				</div>
				<div className="absolute right-0 top-0 max-w-2xl">
					<Image src={appRightImgTree} alt="" />
				</div>
				<div className="absolute bottom-10 left-0 max-w-2xl">
					<Image src={appSvg1} alt="" />
				</div>
			</BackgroundSection>

			<div className="relative inline-block">
				<h2 className="text-5xl font-bold text-neutral-800 md:text-6xl xl:text-7xl">
					Mobile Apps
				</h2>
				<span className="mt-7 block max-w-md text-neutral-600">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus
					porttitor nisl, sit amet finibus libero.
				</span>
				<div className="mt-10 flex space-x-3 sm:mt-14">
					<a href="##" target="_blank" rel="noopener noreferrer">
						<Image src={btnIosPng} alt="" />
					</a>
					<a href="##" target="_blank" rel="noopener noreferrer">
						<Image src={btnAndroidPng} alt="" />
					</a>
				</div>

				<Image
					className="absolute z-10 hidden lg:left-full lg:top-0 lg:block lg:max-w-sm xl:top-1/2 2xl:max-w-none"
					src={appSvg2}
					alt=""
				/>

				<div className="mt-10 block max-w-2xl overflow-hidden rounded-3xl lg:hidden">
					<Image src={appRightImg} alt="" />
				</div>
			</div>
		</div>
	)
}

export default SectionDowloadApp
