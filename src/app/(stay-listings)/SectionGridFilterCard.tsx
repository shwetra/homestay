'use client'
import React, { FC, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import StayCard2Copy from "@/components/StayCard2Copy";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: any //StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const itemsPerPage = 20;

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {

  const [allInternalProperties, setAllInternalProperties] = useState([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
	const totalPages = Math.ceil(allInternalProperties?.length / itemsPerPage);
	const currentItems = allInternalProperties?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	const handlePageChange = (page:number) => {
		setCurrentPage(page);
	  };

    const renderPageNumbers = () => {
      const pageNumbers = [];
    
      const maxPageNumbers = 3; // Limit the number of page numbers displayed
      const half = Math.floor(maxPageNumbers / 2);
    
      let startPage = Math.max(1, currentPage - half);
      let endPage = Math.min(totalPages, currentPage + half);
    
      if (currentPage <= half) {
        startPage = 1;
        endPage = Math.min(maxPageNumbers, totalPages);
      } else if (currentPage + half >= totalPages) {
        startPage = Math.max(1, totalPages - maxPageNumbers + 1);
        endPage = totalPages;
      }
    
      if (startPage > 1) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)} className="mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white bg-primary-600">
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(<span key="start-ellipsis" className="mx-1 text-gray-500">...</span>);
        }
      }
    
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white ${
              currentPage === i ? "bg-primary-700" : "bg-primary-600"
            }`}
          >
            {i}
          </button>
        );
      }
    
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<span key="end-ellipsis" className="mx-1 text-gray-500">...</span>);
        }
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="mx-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white bg-primary-600"
          >
            {totalPages}
          </button>
        );
      }
    
      return pageNumbers;
    };
    

  useEffect(() => { 
    // Extract all internal 'properties' arrays and merge them
    const internalProperties = data?.flatMap((property:any) => property.properties);
    
    // Update state with the combined internal properties
    setAllInternalProperties(internalProperties);
  }, [data]);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems?.map((stay,index) => (
          <StayCard2Copy key={index} data={stay} />
        ))}
      </div>
      {/* pagination  */}
					<div className="mt-16 flex items-center justify-center">
						<div className="flex items-center space-x-2">
							{/* Previous Button */}
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className={`inline-flex h-11 px-3 items-center justify-center border border-gray-400 rounded-full text-gray-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
									}`}
							>
								&larr;
							</button>

							{/* Page Numbers */}
							{renderPageNumbers()}

							{/* Next Button */}
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className={`inline-flex h-11 px-3 items-center justify-center border border-gray-400 rounded-full text-gray-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
									}`}
							>
								&rarr;
							</button>
						</div>
					</div>
    </div>
  );
};

export default SectionGridFilterCard;
