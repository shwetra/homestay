import BackgroundSection from '@/components/BackgroundSection'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import React, { ReactNode } from 'react'
import SectionHeroArchivePage from '../(server-components)/SectionHeroArchivePage'

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={`nc-ListingStayPage relative`}>
			<BgGlassmorphism />

			{/* SECTION HERO */}
			{/* <div className="container pb-24 pt-10 lg:pb-28 lg:pt-16">
				<SectionHeroArchivePage
					currentPage="Experiences"
					currentTab="Experiences"
					listingType={
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-5 w-5"
							>
								<path
									d="M20 8.93333C20 14 14.4615 18 12 18C9.53846 18 4 14 4 8.93333C4 5.10416 7.58172 2 12 2C16.4183 2 20 5.10416 20 8.93333Z"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M15 8.93333C15 14 12.9231 18 12 18C11.0769 18 9 14 9 8.93333C9 5.10416 10.3431 2 12 2C13.6569 2 15 5.10416 15 8.93333Z"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M9 20C9 19.535 9 19.3025 9.05111 19.1118C9.18981 18.5941 9.59413 18.1898 10.1118 18.0511C10.3025 18 10.535 18 11 18H13C13.465 18 13.6975 18 13.8882 18.0511C14.4059 18.1898 14.8102 18.5941 14.9489 19.1118C15 19.3025 15 19.535 15 20C15 20.465 15 20.6975 14.9489 20.8882C14.8102 21.4059 14.4059 21.8102 13.8882 21.9489C13.6975 22 13.465 22 13 22H11C10.535 22 10.3025 22 10.1118 21.9489C9.59413 21.8102 9.18981 21.4059 9.05111 20.8882C9 20.6975 9 20.465 9 20Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
							</svg>
							<span className="ms-2.5">1599 experiences</span>
						</>
					}
				/>
			</div> */}

			{children}

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
					/>
				</div>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />

				{/* SECTION */}
				<div className="relative mb-24 py-16 lg:mb-28">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div>
			</div>
		</div>
	)
}

export default Layout
