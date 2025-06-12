"use client";

import React, { FC, useRef, useEffect, useState } from "react";
import ClearDataButton from "./ClearDataButton";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
export interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onInputDone?: (value: string) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  value,
  onChange,
  onInputDone,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  autoFocus = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPopover, setShowPopover] = React.useState(autoFocus);
  const [suggestions, setSuggestions] = React.useState<{ name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-6">
    <svg
      className="animate-spin h-6 w-6 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
      />
    </svg>
  </div>
);

 useEffect(() => {
  const fetchLocations = async () => {
    if (!value.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
       setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties/search?location=${value}`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
          },
        }
      );

      const allLocations = res?.data?.data?.data || [];

      // Filter based on character length
      const filtered = allLocations.filter((item: any) => {
        const name = item.name.toLowerCase();
        const input = value.toLowerCase();

        if (value.length === 1) {
          return name.startsWith(input[0]);
        } else {
          return name.startsWith(input);
        }
      });

      // Map to required format
      const list = filtered.map((item: any) => ({
        name: item.name,
        slug: item.slug,
      }));

      setSuggestions(list || []);
    } catch (error) {
      console.error("Location fetch error", error);
    }
    finally {
      setLoading(false);
    }
  };

  const debounce = setTimeout(fetchLocations, 300);
  return () => clearTimeout(debounce);
}, [value]);


  useEffect(() => {
    setShowPopover(autoFocus);
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [autoFocus]);

  useOutsideAlerter(containerRef, () => {
    setShowPopover(false);
  });

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

 const handleSelectLocation = (item: { name: string; slug: string }) => {
    onChange(item.name);            // Input field value
    onInputDone?.(item.slug);       // Slug for redirection
    setShowPopover(false);
  };

  // const renderRecentSearches = () => {
  //    if (loading) return <LoadingSpinner />;
  //     if (!value.trim() || suggestions.length === 0) return null;
  //    return(
  //   <>
    
  //     <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base text-neutral-800 dark:text-neutral-100">
  //       Recent searches
  //     </h3>
  //     <div className="mt-2">
  //      {suggestions.map((item) => (
  //       <span
  //         key={item.slug}
  //         onClick={() => handleSelectLocation(item)}
  //         className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
  //       >
  //         <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6 text-neutral-400" />
  //         <span className="text-neutral-700 dark:text-neutral-200">{item.name}</span>
  //       </span>
  //     ))}
  //     </div>
  //   </>)
  // };

  const renderRecentSearches = () => {
  // Show loading spinner
  if (loading) return <LoadingSpinner />;

  // Hide dropdown if input is empty or no suggestions
  if (!value.trim() || suggestions.length === 0) return null;

  return (
    <>
      <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base text-neutral-800 dark:text-neutral-100">
        Recent searches
      </h3>
      <div className="mt-2">
        {suggestions.map((item) => (
          <span
            key={item.slug}
            onClick={() => handleSelectLocation(item)}
            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6 text-neutral-400" />
            <span className="text-neutral-700 dark:text-neutral-200">
              {item.name}
            </span>
          </span>
        ))}
      </div>
    </>
  );
};


  // const renderSearchValue = () => {
  //   if (loading) return <LoadingSpinner />;
  //    if (!value.trim() || suggestions.length === 0) return null;
  //   return({suggestions?.length > 0 && <>
       
  //      {suggestions.map((item) => (
  //       <span
  //         key={item.slug}
  //         onClick={() => handleSelectLocation(item)}
  //         className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
  //       >
  //         <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6 text-neutral-400" />
  //         <span className="text-neutral-700 dark:text-neutral-200">{item.name}</span>
  //       </span>
  //     ))}
      
  //   </>})
  // };

  const renderSearchValue = () => {
  if (loading) return <LoadingSpinner />;

  if (!value.trim()) return null;

  if (suggestions.length > 0) {
    return (
      <>
        {suggestions.map((item) => (
          <span
            key={item.slug}
            onClick={() => handleSelectLocation(item)}
            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6 text-neutral-400" />
            <span className="text-neutral-700 dark:text-neutral-200">
              {item.name}
            </span>
          </span>
        ))}
      </>
    );
  }

  // Optional fallback UI if no matches
  return (
    <div className="px-4 py-4 text-neutral-500 text-sm">
      Not found.
    </div>
  );
};

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex flex-1 relative z-10 [ nc-hero-field-padding--small ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused--2" : ""
        }`}
      >
        <div className="flex-1">
          <input
            ref={inputRef}
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-400 xl:text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && <ClearDataButton onClick={() => onChange("")} />}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        />
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[400px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-5 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
