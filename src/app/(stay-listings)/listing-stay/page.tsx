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


  const fetchFeaturedPlaces = async () => {
				
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-properties?items&type_items`,{
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY, 
        },
      })
      if (data.status === 'success') {
        setLoading(false)
        setFeaturedPlaces(data.data.properties)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
}

useEffect(()=>{
  fetchFeaturedPlaces()
},[])

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

  return <SectionGridFilterCard data={featuredPlaces} className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;
