'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeaderFilter from './HeaderFilter'
import StayCard from './StayCard'
import StayCard2 from './StayCard2'

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8)

//
export interface SectionGridFeaturePlacesProps {
	stayListings?: any //StayDataType[]
	gridClass?: string
	heading?: ReactNode
	subHeading?: ReactNode
	headingIsCenter?: boolean
	tabs?: string[]
	cardType?: 'card1' | 'card2'
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
	stayListings = DEMO_DATA,
	gridClass = '',
	heading = 'Featured places to stay',
	subHeading = '',
	headingIsCenter,
	// tabs = ['New York', 'Tokyo', 'Paris', 'London'],
	tabs = ['Homestay', 'Farmstay', 'Second Home', 'Workstation', 'Apartment'],
	cardType = 'card2',
}) => {

	const [currentActiveTab, setCurrentActiveTab] = useState('Homestay')
	const [toSlice, setToSlice] = useState<number>(8)
	const [loading, setLoading] = useState<boolean>(false)

	function filterListingByTab(tab: any) {
		return stayListings.filter((item: any) => item.name === tab)
	}



	// const [mergedProperties, setMergedProperties] = useState<any[]>([])

	// useEffect(()=>{

	// const allProperties = stayListings.flatMap((item:any) => item.properties);
	// setMergedProperties(allProperties)
	// },[])

	const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

	useEffect(() => {
		const categorySet = new Set<string>();

		stayListings.forEach((category: any) => {
			if (category.name) {
				categorySet.add(category.name);
			}
		});

		setUniqueCategories(Array.from(categorySet));
	}, [stayListings]);


	const filteredProducts = filterListingByTab(currentActiveTab);

	const handleShowMore = () => {
		setLoading(true);

		setTimeout(() => {
			setToSlice(prev => prev + 8);
			setLoading(false);
		}, 1000); // simulate 1 second loading
	};

	const renderCard = (stay: any) => {
		let CardName = StayCard
		switch (cardType) {
			case 'card1':
				CardName = StayCard
				break
			case 'card2':
				CardName = StayCard2
				break

			default:
				CardName = StayCard
		}

		return <CardName toSlice={toSlice} key={stay.id} data={stay} />
	}

	return (
		<div className="nc-SectionGridFeaturePlaces relative" style={{ marginTop: '4rem' }}>
			<HeaderFilter
				tabActive={'Homestay'}
				subHeading={subHeading}
				// tabs={tabs}
				tabs={uniqueCategories}
				heading={heading}
				setCurrentActiveTab={setCurrentActiveTab}
			/>
			<div
				className={`grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
			>

				{filteredProducts.map((stay: any) => renderCard(stay))}
				{/* {stayListings.map((stay:any) => renderCard(stay))} */}

			</div>
			{/* Load more button  */}
			{filteredProducts[0]?.properties?.length > toSlice &&
				<div className="mt-16 flex items-center justify-center">
					<ButtonPrimary loading={loading} onClick={handleShowMore} >Show more</ButtonPrimary>
				</div>}
		</div>
	)
}

export default SectionGridFeaturePlaces
