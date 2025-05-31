'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "../../../SectionGridFilterCard";
import axios from "axios";
import { useImages } from "@/app/contextApi/ImageContext";
import { useLocation } from "react-use";
import StayCard2Copy from "@/components/StayCard2Copy";
import StayCard2 from "@/components/StayCard2";
import Heading2 from "@/shared/Heading2";
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
  const [toSlice, setToSlice] = useState<number>(8)


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

  const handleShowMore = () => {
    setShowMoreLoading(true);
  
    setTimeout(() => {
      setToSlice(prev => prev + 8);
      setShowMoreLoading(false);
    }, 1000); // simulate 1 second loading
  };

  useEffect(() => {
    fetchFilteredProperties()
  }, [state, stayType])

  // useEffect(() => {
  //   if (!location?.pathname) return

  //   const segments = location.pathname.split('/').filter(Boolean)
  //   if (segments.length >= 3) {
  //     setStayType(segments[1])
  //     setState(segments[2])
  //   }
  // }, [location?.pathname])

  
  // convert state name to valid syntax 
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
      <Heading2 heading={`Stays in ${renderState(state)}`} />

      {hasAnyProperties ?

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProperties?.map((stay: any, index: number) => (
            <StayCard2 key={index} toSlice={toSlice} data={stay} />
          ))}
        </div>

        : ""}

        {
          allProperties[0]?.properties?.length === 0 && "No Properties Found"
        }

          {/* Load more button  */}
          {allProperties[0]?.properties?.length > toSlice &&
            <div className="mt-16 flex items-center justify-center">
            <ButtonPrimary loading={showMoreLoading} onClick={handleShowMore}>Show more</ButtonPrimary>
          </div>}

    </div>
  )
};

export default ListingStayPage;
