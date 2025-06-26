'use client';
import { useSearchStore } from "../../../../../app/store/useSearchStore";
import React,{ useState } from "react";
import HomestayCard from "@/components/HomestayCard";
import Heading1 from "@/shared/Heading1";
import ButtonPrimary from "@/shared/ButtonPrimary";

const SearchResultsPage = () => {
  const { results } = useSearchStore();
   console.log(results,"kjdalsjdlk")
   const [visibleCount, setVisibleCount] = useState(8);
   const handleShowMore = () => {
  setVisibleCount(prev => prev + 8);
};
  return (
  <React.Fragment>
   

     <div
          className={`nc-SectionGridFilterCard container pb-24 lg:pb-28`}
          data-nc-id="SectionGridFilterCard"
        >
        <Heading1
          heading={
            results[0]?.property_address?.state
              ? `Search Result ${results.length}`
              : 'Not Found'
          }
        />
        {results.length > 0 ?
            <>
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              
              {results.slice(0, visibleCount).map((home, index) => (
                <>
             
                <HomestayCard
                  key={index}
                  id={home.id}
                  title={home.name}
                  slug={home.slug}
                  location={`${home.property_address?.city || "Unknown"}, ${home.property_address?.state || "Unknown"}`}
                  // bedrooms={home.bedrooms}
                  // beds={home.beds}
                  price={home.min_room_price}
                  rating={home.overall_rating}
                  reviews={home.reviews_count}
                  coverImage={home.cover_photo} 
                     images={[
                      home.cover_photo,
                      ...(Array.isArray(home.property_photos)
                        ? home.property_photos
                            .filter((photo: any) => photo.image_url !== home.cover_photo) // avoid duplicating cover
                            .map((photo: { image_url: string }) => photo.image_url)
                        : []),
                    ]}
                />
             
              
              </>
              ))}
             
             
            </div>
             {visibleCount < results.length && (
                <div className="flex justify-center mt-6">
                  <ButtonPrimary
                    onClick={handleShowMore}
                    
                  >
                    Show More
                  </ButtonPrimary>
                </div>
              )}
              </>
            : ""}
    
            {
              results[0]?.properties?.length === 0 && "No Properties Found"
            }
    
          
    
        </div>
        </React.Fragment>
  );
};

export default SearchResultsPage;