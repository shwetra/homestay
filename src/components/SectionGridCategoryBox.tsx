'use client'
import CardCategoryBox1 from '@/components/CardCategoryBox1'
import Heading from '@/shared/Heading'
import { TaxonomyType } from '@/data/types'
import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useWindowSize } from 'react-use'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'

export interface SectionGridCategoryBoxProps {
	categories?: TaxonomyType[]
	headingCenter?: boolean
	categoryCardType?: 'card1'
	className?: string
	gridClassName?: string
}

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Mukteshwar',
		taxonomy: 'category',
		count: 1882,
		thumbnail:
			'https://www.himalayanmoments.com/image/display?image=aHR0cHM6Ly93d3cuaGltYWxheWFubW9tZW50cy5jb20vZ3ZhX2Fzc2V0cy9wYWNrYWdlcy8xMDkxLzE1NDYwNjE3OTNfbXVrdHN3YXIxLmpwZyZ3PTg4MCZoPTQ5Ng==',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Nanital',
		taxonomy: 'category',
		count: 8288,
		thumbnail:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXjZuZJf13afUpsqBCwtSQVw-fB_aQ1VdlQ&s',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Goa',
		taxonomy: 'category',
		count: 1288,
		thumbnail:
			'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/3e/36/95/baga-sea-beach.jpg?w=600&h=400&s=1',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Kasauli',
		taxonomy: 'category',
		count: 112,
		thumbnail:
			'https://c.myholidays.com/blog/2023/4/29180_Kasauli%20Mall%20Road.webp',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Vrindavan',
		taxonomy: 'category',
		count: 323,
		thumbnail:
			'https://navbharattimes.indiatimes.com/thumb/92869703/prem-mandir-in-vrindavan-temple-of-divine-love-92869703.jpg?imgsize=145800&width=1600&height=900&resizemode=75',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Amritsar',
		taxonomy: 'category',
		count: 2223,
		thumbnail:
			'https://www.happytrips.com/photo/57570093.cms',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Palampur',
		taxonomy: 'category',
		count: 1775,
		thumbnail:
			'https://s3.india.com/wp-content/uploads/2024/09/palampur-quint-towns.jpg',
	},
	{
		id: '8',
		href: '/listing-stay-map',
		name: 'Chandigarh',
		taxonomy: 'category',
		count: 1288,
		thumbnail:
			'https://s3.india.com/wp-content/uploads/2024/03/Feature-Image_-Chandigarh-2.jpg?impolicy=Medium_Widthonly&w=350&h=263',
	},
]

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
	categories = DEMO_CATS,
	categoryCardType = 'card1',
	headingCenter = true,
	className = '',
	// itemPerRow = 5,
	gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}) => {
	let CardComponentName = CardCategoryBox1
	switch (categoryCardType) {
		case 'card1':
			CardComponentName = CardCategoryBox1
			break

		default:
			CardComponentName = CardCategoryBox1
	}

	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [numberOfItems, setNumberOfitem] = useState(0)
	const [itemPerRow, setItemPerRow] = useState(4)

	const windowWidth = useWindowSize().width
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 500) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2)
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1)
		}

		setNumberOfitem(itemPerRow)
	}, [itemPerRow, windowWidth])

	function changeItemId(newVal: number) {
		if (newVal > currentIndex) {
			setDirection(1)
		} else {
			setDirection(-1)
		}
		setCurrentIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < categories?.length - 1) {
				changeItemId(currentIndex + 1)
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1)
			}
		},
		trackMouse: true,
	})

	return (
		<div className={`nc-SectionGridCategoryBox relative ${className}`} style={{marginTop:'2rem'}}>
			<Heading
				desc="Discover great places near where you live"
				isCenter={headingCenter}
			>
				Explore nearby
			</Heading>
			<MotionConfig
				transition={{
					x: { type: 'spring', stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 },
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root overflow-hidden rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative -mx-2 whitespace-nowrap xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{categories.map((item, indx) => (
									<motion.li
										className={`relative inline-block px-2 xl:px-4`}
										custom={direction}
										initial={{
											x: `${(currentIndex - 1) * -100}%`,
										}}
										animate={{
											x: `${currentIndex * -100}%`,
										}}
										// variants={variants(200, 1)}
										key={indx}
										style={{
											width: `calc(1/${numberOfItems} * 100%)`,
										}}
									>
										<CardComponentName key={indx} taxonomy={item} />
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
					</div>

					{currentIndex ? (
						<PrevBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex - 1)}
							className="absolute -left-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-left-6 xl:h-12 xl:w-12"
						/>
					) : null}

					{categories.length > currentIndex + numberOfItems ? (
						<NextBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex + 1)}
							className="absolute -right-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-right-6 xl:h-12 xl:w-12"
						/>
					) : null}
				</div>
			</MotionConfig>

			{/* <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
				{categories.map((item, i) => (
					<CardComponentName key={i} taxonomy={item} />
				))}
			</div> */}
		</div>
	)
}

export default SectionGridCategoryBox
