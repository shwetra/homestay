import React from "react";
import GallerySlider2 from '@/components/GallerySlider2'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import Link from "next/link";

interface HomestayCardProps {
  size?: 'default' | 'small',
  title: string;
  location: string;
  // bedrooms: number;
  // beds: number;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  coverImage?: string;
  id: string | number;
  slug:string;
}
const HomestayCard: React.FC<HomestayCardProps> = ({
  size = 'default',
  title,
  location,
  // bedrooms,
  // beds,
  price,
  rating,
  reviews,
  images,
  id,
  slug,
  coverImage,
  }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
   <>
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-sm">
      <div className="relative">
       <GallerySlider2
        uniqueID={`${id}`}
        ratioClass="aspect-w-12 aspect-h-8"
        coverImage={coverImage}
        galleryImgs={images}
        imageClass="rounded-lg"
        href={`/property/${slug}`}
    />
        <BtnLikeIcon  className="absolute right-3 top-3 z-[1]" />
      </div>
      <Link href={`/property/${slug}`}>
      <div className="p-4">
       {/* {bedrooms && beds && (
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {bedrooms} bedroom · {beds} bed
        </span>
        )} */}
        
        <div className="flex items-center space-x-2">
						
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === 'default' ? 'text-base' : 'text-base'
								}`}
						>
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
         
       <div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
						{size === 'default' && (
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						)}
						<span className="">{location}</span>
					</div>
                   
                    <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 mb-2 mt-5"></div>
                    <div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{price}
						{` `}
						{size === 'default' && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								/night
							</span>
						)}
					</span>
					<StartRating
						reviewCount={reviews}
						point={rating}
					/>
					
				</div>
      </div>
      </Link>
    </div>
   </>
  );
};

export default HomestayCard;
