import Image, { StaticImageData } from 'next/image'
import React, { FC, ReactNode } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'

export interface SectionHeroProps {
	className?: string
	rightImg: StaticImageData
	heading: ReactNode
	subHeading: any
	btnText: string
}

const SectionHero: FC<SectionHeroProps> = ({
	className = '',
	rightImg,
	heading,
	subHeading,
	btnText,
}) => {
	
	return (
		<div className={`nc-SectionHero relative ${className}`}>
			<div className="relative flex flex-col items-center space-y-14 text-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:text-left">
				<div className="w-screen max-w-full space-y-5 lg:space-y-7 xl:max-w-lg">
					<h2 className="text-3xl font-semibold !leading-tight text-neutral-900 dark:text-neutral-100 md:text-4xl xl:text-5xl">
						{heading}
					</h2>
					<span className="block text-base text-neutral-600 dark:text-neutral-400 xl:text-lg">
						{subHeading}
					</span>
					{!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
				</div>
				<div className="flex-grow rounded-lg overflow-hidden">
					<Image className="w-full" src="https://www.homestaysofindia.com/wp-content/uploads/2023/04/Locals-Upper-Dah-Homestay-Aryan-Valley.jpg" width={1450} height={630} alt="" />
				</div>
			</div>
		</div>
	)
}

export default SectionHero
