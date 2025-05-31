'use client'

import Heading from '@/shared/Heading'
import React, { FC, useState } from 'react'
import clientSayMain from '@/images/clientSayMain.png'
import clientSay1 from '@/images/clientSay1.png'
import clientSay2 from '@/images/clientSay2.png'
import clientSay3 from '@/images/clientSay3.png'
import clientSay4 from '@/images/clientSay4.png'
import clientSay5 from '@/images/clientSay5.png'
import clientSay6 from '@/images/clientSay6.png'
import quotationImg from '@/images/quotation.png'
import quotationImg2 from '@/images/quotation2.png'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import { variants } from '@/utils/animationVariants'

export interface SectionClientSayProps {
	className?: string
	data?: any //typeof DEMO_DATA
}

const DEMO_DATA = [
	{
		id: 1,
		clientName: 'Tiana Abie',
		clientAddress: 'Malaysia',
		content:
			'This place is exactly like the picture posted on Homestays. Great service, we had a great stay!',
	},
	{
		id: 2,
		clientName: 'Lennie Swiffan',
		clientAddress: 'London',
		content:
			'This place is exactly like the picture posted on Homestays. Great service, we had a great stay!',
	},
	{
		id: 3,
		clientName: 'Berta Emili',
		clientAddress: 'Tokyo',
		content:
			'This place is exactly like the picture posted on Homestays. Great service, we had a great stay!',
	},
]

const SectionClientSay: FC<SectionClientSayProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	function changeItemId(newVal: number) {
		if (newVal > index) {
			setDirection(1)
		} else {
			setDirection(-1)
		}
		setIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (index < data?.length - 1) {
				changeItemId(index + 1)
			}
		},
		onSwipedRight: () => {
			if (index > 0) {
				changeItemId(index - 1)
			}
		},
		trackMouse: true,
	})

	let currentItem = data[index]

	const renderBg = () => {
		return (
			<div className="hidden md:block">
				<Image
					className="absolute -left-20 top-9"
					src={clientSay1}
					alt="client 1"
				/>
				<Image
					className="absolute bottom-[100px] right-full mr-40"
					src={clientSay2}
					alt="client 2"
				/>
				<Image
					className="absolute left-[140px] top-full"
					src={clientSay3}
					alt="client 3"
				/>
				<Image
					className="absolute -bottom-10 right-[140px]"
					src={clientSay4}
					alt="client 4"
				/>
				<Image
					className="absolute bottom-[80px] left-full ml-32"
					src={clientSay5}
					alt="client 5"
				/>
				<Image
					className="absolute -right-10 top-10"
					src={clientSay6}
					alt="client 6"
				/>
			</div>
		)
	}

	return (
		<div className={`nc-SectionClientSay relative ${className}`}>
			<Heading desc="Let's see what people think of Homestays" isCenter>
				Testimonials
			</Heading>
			<div className="relative mx-auto max-w-2xl md:mb-16 pb-[35px]">
				{/* {renderBg()} */}
				{/* <Image className="mx-auto" src={clientSayMain} alt="" /> */}
				<div className={`relative mt-12 lg:mt-16`}>
					<Image
						className="absolute right-full top-1 -mr-16 opacity-50 md:opacity-100 lg:mr-3"
						src={quotationImg}
						alt=""
					/>
					<Image
						className="absolute left-full top-1 -ml-16 opacity-50 md:opacity-100 lg:ml-3"
						src={quotationImg2}
						alt=""
					/>

					<MotionConfig
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
					>
						<div
							className={`relative overflow-hidden whitespace-nowrap`}
							{...handlers}
						>
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={index}
									custom={direction}
									variants={variants(200, 1)}
									initial="enter"
									animate="center"
									// exit="exit"
									className="inline-flex flex-col items-center whitespace-normal text-center"
								>
									<>
										<span className="block text-2xl">
											{currentItem?.description}
										</span>
										<span className="mt-8 block text-2xl font-semibold">
											{currentItem?.name}
										</span>
										<div className="mt-2 flex items-center space-x-2 text-lg text-neutral-400">
											{/* <MapPinIcon className="h-5 w-5" /> */}
											<span>{currentItem?.designation}</span>
										</div>
									</>
								</motion.div>
							</AnimatePresence>

							<div className="mt-10 flex items-center justify-center space-x-2">
								{data.map((item:any, i:any) => (
									<button
										className={`h-2 w-2 rounded-full ${
											i === index ? 'bg-black/70' : 'bg-black/10'
										}`}
										onClick={() => changeItemId(i)}
										key={i}
									/>
								))}
							</div>
						</div>
					</MotionConfig>
				</div>
			</div>
		</div>
	)
}

export default SectionClientSay
