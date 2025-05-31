'use client'
import React, { FC, useEffect, useState } from "react";
import SectionGridHasMap from "../../SectionGridHasMap";
import axios from "axios";
import { useLocation } from "react-use";
import { useImages } from "@/app/contextApi/ImageContext";
import Heading2 from "@/shared/Heading2";
import SkeletonLoader3 from "@/components/skeleton/SkeletonLoader3";

export interface ListingStayMapPageProps {}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({}) => {

  const { allProperties, setAllProperties } = useImages();
  const [allInternalProperties, setAllInternalProperties] = useState<any[]>([]);
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const location = useLocation();

    const fetchFilteredProperties = async () => {
        if (!city) return;
        try {
            setLoading(true)
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/properties-cities?city=${city}`,
                {
                    headers: { "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY },
                }
            );
            if (data.status === 'success') {
                setLoading(false)
                setAllProperties(data?.data?.properties)
                const internalProperties = data.data.properties.flatMap((property: any) => property.properties);
                setAllInternalProperties(internalProperties);
            } else {
                setAllInternalProperties([]);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchFilteredProperties();
    }, [city]);
    

    useEffect(() => {
        if (!location?.pathname) return;
        const segments = location.pathname.split('/').filter(Boolean);
        if (segments.length >= 2) {
            setCity(segments[1]);
        }
    }, [location?.pathname]);

    // convert state name to valid syntax 
      const renderCity = (city: any): string => {
        if (!city) return "";
        return city.replace(/%20/g, " ") // Replace %20 with space
        .split(" ") // Split into words
        .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" ");
      };


    if (loading) {
        return (
            <div
                className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
                data-nc-id="SectionGridFilterCard"
            >
                <Heading2 heading={`Stays in ${renderCity(city)}` || 'your location'} />

                <SkeletonLoader3 className="h-[300px] rounded-lg" />

            </div>
        )
    }


  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap city={city} stayListings={allInternalProperties} />
    </div>
    
  );
};

export default ListingStayMapPage;
