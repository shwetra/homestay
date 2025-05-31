'use client'
import React, { useState,useEffect, useContext, useCallback } from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionHowItWork from '@/components/SectionHowItWork'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionVideos from '@/components/SectionVideos'
import SectionClientSay from '@/components/SectionClientSay'
import HoitripsSlider from '@/components/HoitripsSlider'
import axios from 'axios'
import SkeletonLoader from '@/components/skeleton/SkeletonLoader'
import SkeletonLoader2 from '@/components/skeleton/SkeletonLoader2'
import SkeletonLoader3 from '@/components/skeleton/SkeletonLoader3'
import {LocationContext} from './contextApi/LocationContext'
import CustomTestimonial from '@/components/CustomTestimonial'

const DEMO_CATS: any = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Ladakh',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2023/11/Cover-Pic-9-scaled.jpg',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Andaman',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/2403207/pexels-photo-2403207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Manali',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5205097/pexels-photo-5205097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Lakshadweep',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/827280706/photo/beach-chairs.jpg?b=1&s=612x612&w=0&k=20&c=oZehsp9ZGJcrkh24yxNSy0eHBeYylMz7BL9-_w5KoZY=',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Goa',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/123384440/photo/panjim-church-goa.jpg?b=1&s=612x612&w=0&k=20&c=qQhlgHwRTiOJ5vVjqNTck3DC6EjpKHFQOWvpaw4YqFg=',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Shimla',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/3574440/pexels-photo-3574440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Nanital',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://media.istockphoto.com/id/484389570/photo/himalayas.jpg?b=1&s=612x612&w=0&k=20&c=ijMJJGOuJzNM1G86P_70jPNCtr4uaYrfLdoTol8_rZU=',
	},
]

const DEMO_CATS_2: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Enjoy the great cold',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Sleep in a floating way',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: "In the traditions house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2022/10/Exterior-2-Monolith-Homestay-Manila-Almora.jpg',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Cool in the deep forest',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/Exterior-1.jpeg',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: "In the traditions house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2022/10/Exterior-2-Monolith-Homestay-Manila-Almora.jpg',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: "Enjoy the cold Surrounding",
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Cool in the deep forest',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://www.homestaysofindia.com/wp-content/uploads/2024/07/Exterior-1.jpeg',
	},
]

function PageHome() {
	const [popularDestinations, setPopularDestinations] = useState<any>([]);
	const [homestayType, setHomeStayType] = useState<any>([]);
	const [testimonials, setTestimonials] = useState<any>([]);
	const [nearbyPlaces, setNearbyPlaces] = useState<any>([]);
	const [staysSuggestion, setStaysSuggestion] = useState<any>([]);
	const [featuredPlaces, setFeaturedPlaces] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<any>(true); 

	const {location} = useContext<any>(LocationContext)
  
	const fetchPopularDestinations = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/top-destinations?items=10`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setPopularDestinations(data.data.starting_cities);
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	const fetchHomestayType = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property-types?items=`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setHomeStayType(data.data.property_types);
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	const fetchTestimonials = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials?items=`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setTestimonials(data.data.testimonials);
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	const fetchExploreNearBy = useCallback(async () => {
		try {
		  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/nearby-places?latitude=${location.latitude}&longitude=${location.longitude}&radius=200&items=10`, {
			headers: {
			  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
			},
		  });
		//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/nearby-places?latitude=28.6097&longitude=77.0895&radius=200&items=10`, {
		// 	headers: {
		// 	  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		// 	},
		//   });
		  if (data.status === 'success') {
			setNearbyPlaces(data.data.places);
		  }
		} catch (error) {
		  console.error(error);
		}
	  },[location]) 
  
	const fetchStaysSuggestion = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/recommended-properties?items`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setStaysSuggestion(data.data.properties);
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	const fetchFeaturedPlaces = async () => {
	  try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-properties?items&type_items`, {
		  headers: {
			"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
		  },
		});
		if (data.status === 'success') {
		  setFeaturedPlaces(data.data.properties);
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	// Fetch all data and set isLoading to false when done
	useEffect(() => {
	  const fetchData = async () => {
		await Promise.all([
		  fetchPopularDestinations(),
		  fetchHomestayType(),
		  fetchTestimonials(),
		  fetchExploreNearBy(),
		  fetchStaysSuggestion(),
		  fetchFeaturedPlaces(),
		]);
		setIsLoading(false);
	  };
	  fetchData();
	}, [fetchExploreNearBy]);

  
	return (
	  <main className="nc-PageHome relative overflow-hidden">
		{/* GLASSMOPHIN */}
		<BgGlassmorphism />

		<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
		  {/* SECTION HERO */}
		  {isLoading ? (
			<SkeletonLoader className="h-[500px] mt-3 rounded-lg" />
		  ) : (
			<SectionHero className="pt-10 lg:pb-16 lg:pt-16 lg:-mb-[9rem]" />
		  )}
  
		  {/* SECTION 1 */}
		  {isLoading ? (
			<SkeletonLoader2 className="h-[300px] rounded-lg" />
		  ) : (
			<SectionSliderNewCategories categories={popularDestinations} />
		  )}
  
		  {/* Featured Places */}
		  {isLoading ? (
			<SkeletonLoader3 className="h-[300px] rounded-lg" />
		  ) : (
			<SectionGridFeaturePlaces cardType="card2" stayListings={featuredPlaces} />
		  )}
  
		  {/* Stays Suggestions */}
		  <div className="relative pt-1 pb-8" style={{ marginTop: '4rem' }}>
			<BackgroundSection className="bg-orange-50 dark:bg-black/20" />
			{isLoading ? (
			  <SkeletonLoader2 className="h-[400px] rounded-lg" />
			) : (
			  <SectionSliderNewCategories
				categories={staysSuggestion}
				categoryCardType="card4"
				itemPerRow={4}
				heading="Suggestions for Stays"
				subHeading="Popular places to stay that Homestays recommends"
				sliderStyle="style2"
			  />
			)}
		  </div>
  
		  {/* Nearby Places */}
		  {isLoading ? (
			<SkeletonLoader2 className="h-[200px] rounded-lg" />
		  ) : (
			<SectionGridCategoryBox categories={nearbyPlaces} />
		  )}
  
		  {/* Testimonials */}
		  {isLoading ? (
			<SkeletonLoader className="h-[200px] rounded-lg" />
		  ) : (
			<div className="relative py-8" style={{ marginTop: '4rem' }}>
			  <BackgroundSection />
			  {/* <SectionClientSay data={testimonials} /> */}
			  <CustomTestimonial data={testimonials} />
			</div>
		  )}
		</div>
	  </main>
	);
  }
  
  export default PageHome;
  