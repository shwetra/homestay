import React, { FC } from 'react'
import rightImgPng from '@/images/our-features.png'
import Image, { StaticImageData } from 'next/image'
import Badge from '@/shared/Badge'

export interface SectionOurFeaturesProps {
	className?: string
	rightImg?: StaticImageData
	type?: 'type1' | 'type2'
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
	className = 'lg:py-14',
	rightImg = rightImgPng,
	type = 'type1',
}) => {
	return (
		<div
			className={`nc-SectionOurFeatures relative flex flex-col items-center ${
				type === 'type1' ? 'lg:flex-row' : 'lg:flex-row-reverse'
			} ${className}`}
			data-nc-id="SectionOurFeatures"
		>
			<div className="flex-grow">
				<Image src={rightImg} alt="" />
			</div>
			<div
				className={`mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 ${
					type === 'type1' ? 'lg:pl-16' : 'lg:pr-16'
				}`}
			>
				<span className="text-sm uppercase tracking-widest text-gray-400">
					BENnefits
				</span>
				<h2 className="mt-5 text-4xl font-semibold">Happening cities </h2>

				<ul className="mt-16 space-y-10">
					<li className="space-y-4">
						<Badge name="Advertising" />
						<span className="block text-xl font-semibold">
							Cost-effective advertising
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							With a free listing, you can advertise your rental with no upfront
							costs
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="green" name="Exposure " />
						<span className="block text-xl font-semibold">
							Reach millions with Chisfis
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							Millions of people are searching for unique places to stay around
							the world
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="red" name="Secure" />
						<span className="block text-xl font-semibold">
							Secure and simple
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							A Holiday Lettings listing gives you a secure and easy way to take
							bookings and payments online
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default SectionOurFeatures
