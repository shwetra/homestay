'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import Heading2 from "@/shared/Heading2";
import Heading1 from "@/shared/Heading1";
import SkeletonLoader3 from "@/components/skeleton/SkeletonLoader3";

export interface ListingStayPageProps {}
 
const ListingStayPage: FC<ListingStayPageProps> = () => {

  const [featuredPlaces, setFeaturedPlaces] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const [filters, setFilters] = useState({
   
    location:null,
    type_items: null,
    beds: null,
    min_price: null,
    max_price: null
  });
    // Safe to use searchParams after hydration
 useEffect(() => {
    const savedType = typeof window !== 'undefined' ? localStorage.getItem("selectedPropertyType") : null;
    if (savedType) {
      setFilters((prev:any) => ({ ...prev, type_items: savedType }));
    }
  }, []);
//   const fetchFeaturedPlaces = async () => {
				
//     try {
//       setLoading(true)
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-filter?type_items=${filters?.type_items}&min_price=${filters?.min_price}&max_price=${filters?.max_price}&beds=${filters?.beds}&location=${filters?.location}`,{
//         headers: {
//           "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
//         },
        
//       })
//       if (data.status === 'success') {
//         setLoading(false)
//         setFeaturedPlaces(data.data.property_types)
//       }
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
// }

const fetchFeaturedPlaces = async () => {
  try {
    setLoading(true);

   
    const params = new URLSearchParams();

    if (filters?.type_items) params.append("type_items", filters.type_items);
    if (filters?.min_price) params.append("min_price", filters.min_price);
    if (filters?.max_price) params.append("max_price", filters.max_price);
    if (filters?.beds) params.append("beds", filters.beds);
    if (filters?.location) params.append("location", filters.location);

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-filter?${params.toString() }`,{
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      }
    );

    if (data.status === 'success') {
      setFeaturedPlaces(data.data.property_types);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(()=>{
   console.log("Filters updated:", filters);
  fetchFeaturedPlaces()
},[filters])

if (loading) {
  return (
    <div
      className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
      data-nc-id="SectionGridFilterCard"
    >
      <Heading1 heading={`Stays in India`} />

      <SkeletonLoader3 className="h-[300px] rounded-lg" />

    </div>
  )
}

  return <SectionGridFilterCard data={featuredPlaces}  filters={filters}
    setFilters={setFilters} className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;
