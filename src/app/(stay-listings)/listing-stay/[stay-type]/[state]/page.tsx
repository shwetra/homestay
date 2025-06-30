'use client'
import React, { FC, useEffect, useState, useRef } from "react";
import SectionGridFilterCard from "../../../SectionGridFilterCard";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2Copy from "@/components/StayCard2Copy";
import StayCard2 from "@/components/StayCard2";
// import Heading1 from "@/shared/heading1";
import Heading2 from "@/shared/Heading2";
import Heading1 from "@/shared/Heading1";
import SkeletonLoader3 from "@/components/skeleton/SkeletonLoader3";
import { slice } from "lodash";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useParams } from "next/navigation";

export interface ListingStayPageProps { }
const itemsPerPage = 10;

const ListingStayPage: FC<ListingStayPageProps> = () => {

  const params = useParams();
  const stayType = params['stay-type'];
  const state = params['state'];
  console.log(params['stay-type'], params['state']);




  
  const { allProperties, setAllProperties } = useImages()
  // const [state, setState] = useState<any>()
  // const [stayType, setStayType] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false)
  const [toSlice, setToSlice] = useState<number>(24)


  const location = useLocation()

  const fetchFilteredProperties = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties-search?state=${state}&name=${stayType}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      })
      if (data.status === 'success') {
        setLoading(false)
        setAllProperties(data?.data?.properties)
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchFilteredProperties()
  }, [state, stayType])

  const observerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting && allProperties[0]?.properties?.length > toSlice) {
      setToSlice((prev) => prev + 8);
    }
  }, {
    rootMargin: "0px",
    threshold: 1.0,
  });

  if (observerRef.current) {
    observer.observe(observerRef.current);
  }

  return () => {
    if (observerRef.current) {
      observer.unobserve(observerRef.current);
    }
  };
}, [toSlice, allProperties]);

  
  // convert state name to valid syntax 
  	const formatName = (name: string) => {
  return name
    .replace(/-/g, ' ')                      // Replace dashes with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
};
  const renderState = (state: any): string => {
    if (!state) return "";
    return state.replace(/%20/g, " ") // Replace %20 with space
    .split(" ") // Split into words
    .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" ");
  };
  
  
  const hasAnyProperties = allProperties?.some((item: any) => item.properties.length > 0);

  if (loading) {
    return (
      <div
        className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
        data-nc-id="SectionGridFilterCard"
      >
        <Heading2 heading={`Stays in ${renderState(state) || "your location"}`} />

        <SkeletonLoader3 className="h-[300px] rounded-lg" />

      </div>
    )
  }

  //   return <SectionGridFilterCard data={allProperties.length > 0  ? allProperties : featuredPlaces} className="container pb-24 lg:pb-28" />;
  return (
    <div
      className={`nc-SectionGridFilterCard container pb-24 lg:pb-28`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading1 heading= {`Stays in ${formatName(renderState(state))}`} />
      

      {hasAnyProperties && (
        <>
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProperties?.map((stay: any, index: number) => (
            <StayCard2 key={index} toSlice={toSlice} data={stay} />
          ))}
        </div>
         <div ref={observerRef} className="h-10" />
         </>
       )}

        {
          allProperties[0]?.properties?.length === 0 && "No Properties Found"
        }

         
         

    </div>
    
  )
};

export default ListingStayPage;
