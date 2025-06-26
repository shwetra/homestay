"use client";

import { useState, FC, useMemo, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Photo {
  id: number;
  image_url: string;
  phototype: {
    id: number;
    name: string;
  } | null;
}

interface CategoryImageSliderProps {
  propertiesPhotos: Photo[];
}

const CategoryImageSlider: FC<CategoryImageSliderProps> = ({ propertiesPhotos }) => {
 const categoryListRef = useRef<HTMLDivElement | null>(null);

const scrollCategory = (direction: "up" | "down") => {
  if (categoryListRef.current) {
    const scrollAmount = 120;
    categoryListRef.current.scrollBy({
      top: direction === "up" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};
const categories = useMemo(() => {
  const unique = new Set<string>();
  propertiesPhotos.forEach((photo) => {
    if (photo.phototype?.name) {
      unique.add(photo.phototype.name);
    } else {
      unique.add("Other");
    }
  });

  const sorted = Array.from(unique).sort((a, b) => {
    if (a === "Room") return -1;
    if (b === "Room") return 1;
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  return sorted;
}, [propertiesPhotos]);



  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }
}, [categories, selectedCategory]);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  // Filter images according to selectedCategory
  const filteredImages = propertiesPhotos.filter((photo) => {
    if (selectedCategory === "Other") {
      return !photo.phototype;
    } else {
      return photo.phototype?.name === selectedCategory;
    }
  });

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
return (
  <div className="p-4">
    <div className="flex gap-4">
      {/* Left: Vertical Categories */}
        <div className="w-40 flex flex-col items-center">
    {/* Up Arrow */}
    <button
      onClick={() => scrollCategory("up")}
      className="mb-2 p-1 bg-white rounded-full shadow"
    >
      <ChevronUpIcon className="w-5 h-5 text-gray-700" />
    </button>

    {/* Scrollable category list without native scrollbar */}
    <div
      ref={categoryListRef}
      className="flex flex-col gap-4 max-h-[60vh] overflow-y-scroll scroll-smooth scrollbar-hide"
    >
      {categories.map((cat) => {
        const thumb = propertiesPhotos.find((photo) => {
          if (cat === "Other") return !photo.phototype;
          return photo.phototype?.name === cat;
        });

        return (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`cursor-pointer border ${
              selectedCategory === cat ? "border-blue-600" : "border-transparent"
            } rounded`}
          >
            {thumb?.image_url && (
              <Image
                src={thumb.image_url}
                alt={cat}
                width={128}
                height={96}
                className="w-full h-auto object-cover rounded shadow"
              />
            )}
            <p className="text-center text-xs mt-1">{cat}</p>
          </div>
        );
      })}
    </div>

    {/* Down Arrow */}
    <button
      onClick={() => scrollCategory("down")}
      className="mt-2 p-1 bg-white rounded-full shadow"
    >
      <ChevronDownIcon className="w-5 h-5 text-gray-700" />
    </button>
  </div>

     

      {/* Right: Image Slider */}
      <div className="flex-1 relative overflow-hidden rounded-lg shadow-lg">
        {filteredImages.length > 0 && (
          <div className="relative w-full overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredImages.map((photo, index) => (
                <div
                  key={photo.id}
                  className="w-full flex-shrink-0 flex justify-center"
                >
                  <img
                    src={photo.image_url}
                    alt={`Slide ${index + 1}`}
                    className="w-full max-h-[70vh] object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeftIcon className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRightIcon className="w-6 h-6 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default CategoryImageSlider;
