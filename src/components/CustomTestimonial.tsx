'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import Heading2 from '@/shared/Heading2'
import Heading from '@/shared/Heading'

export interface Testimonial {
  name: string
  designation: string
  description: string
}

export interface CustomTestimonialProps {
  data?: Testimonial[]
}

const testimonials = [
    {
      name: 'Jane Doe',
      designation: 'Product Manager',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    {
      name: 'John Smith',
      designation: 'Software Engineer',
      description:
        'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
    {
      name: 'Alice Johnson',
      designation: 'UX Designer',
      description:
        'Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget.',
    },
    {
      name: 'Alice Johnson',
      designation: 'UX Designer',
      description:
        'Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget.',
    },
    {
      name: 'Alice Johnson',
      designation: 'UX Designer',
      description:
        'Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget.',
    },
    // Add more as needed
  ]
  

const CustomTestimonial: React.FC<CustomTestimonialProps> = ({ data }) => {
  return (
    <>
        <Heading desc={"Let's see what people think of Homestays"} isCenter={true}>
				Testimonials
			</Heading>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination,Autoplay]}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
            className="mySwiper py-6 testimonial-swiper"
            >
            {data?.map((item, index) => (
                <SwiperSlide key={index}>
                <TestimonialCard
                    name={item.name}
                    designation={item.designation}
                    description={item.description}
                />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default CustomTestimonial

// --- Card Component ---

interface CardProps {
  name: string
  designation: string
  description: string
  maxChars?: number
}

const TestimonialCard: React.FC<CardProps> = ({
  name,
  designation,
  description,
  maxChars = 120,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = description.length > maxChars
  const displayedText = isExpanded
    ? description
    : description.slice(0, maxChars)

  return (
    <div className="rounded-xl border shadow-md p-6 bg-white h-full flex flex-col justify-between">
      <p className="text-sm text-gray-700 mb-4">
        {displayedText}
        {isLong && !isExpanded && '...'}
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 text-blue-500 text-sm font-medium hover:underline"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
      <div className='text-right'>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-gray-500 text-sm">{designation}</p>
      </div>
    </div>
  )
}
