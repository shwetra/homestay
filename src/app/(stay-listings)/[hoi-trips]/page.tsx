'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading1 from "@/shared/Heading1";
import { useImages } from "@/app/contextApi/ImageContext";
import HoiTripsCard from "@/components/HoiTripsCard";
import { useParams } from "next/navigation";
import Link from "next/link";
interface HoitripPhoto {
  id: number;
  photo: string;
  serial: number;
}

interface Hoitrip {
  id: number;
  title: string;
  price: number;
  city: string;
  slug: string;
  state: string;
  hoitripphoto?: HoitripPhoto[];
}

const HoiTrips = () => {
     const params = useParams();
      const hoitrips = params['hoi-trips'];
   
  const { allProperties, setAllProperties } = useImages();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHoiTrips = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hoitrip`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
      });

      const data = response.data;
      if (data.status === 'success') {
        setAllProperties(data.data); 
      }
    } catch (error) {
      console.error("Error fetching hoitrips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoiTrips();
  }, []);

  return (
    <div className="nc-SectionGridFilterCard container pb-24 lg:pb-28" data-nc-id="SectionGridFilterCard">
      <Heading1 heading="Stays in Hoi Trips" />

      {allProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProperties.map((trip: Hoitrip, index: number) => (
            <>
            <Link href={`/hoitrips/${trip.slug}`}>
            <HoiTripsCard
              key={index}
              title={trip.title}
              location={`${trip.city || "Unknown"}, ${trip.state || "Unknown"}`}
              price={trip.price}
              rating={0}
              reviews={0}
              images={trip.hoitripphoto?.map(photo => photo.photo) || []}
            />
            </Link>
            </>
          ))}
        </div>
      ) : (
        !loading && <p>No Trips Found</p>
      )}
    </div>
  );
};

export default HoiTrips;
