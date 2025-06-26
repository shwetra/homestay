'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Input from '@/shared/Input'
import Image from 'next/image';
import ButtonSecondary from '@/shared/ButtonSecondary'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import ButtonCircle from '@/shared/ButtonCircle'
import CommentListing from '@/components/CommentListing'
import { useImages } from "@/app/contextApi/ImageContext";
import Avatar from '@/shared/Avatar'
import StartRating from '@/components/StartRating'
import parse from 'html-react-parser';
import GuestsInput from './GuestsInput';
import { toast } from 'react-toastify'
import {  ArrowRightIcon, ArrowLeftIcon ,CalendarIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon, } from '@heroicons/react/24/outline';
import StayDatesRangeInput from './StayDateRangeInput';
import Label from '@/components/Label';
import ButtonPrimary from '@/shared/ButtonPrimary';
import CategoryImageSlider from '@/components/CategoryImageSlider';
interface HoitripPhoto {
  id: number;
  photo: string;
  serial: number;
}

interface Hoitrip {
  id: number;
  title: string;
  slug: string;
  price: number;
  city: string;
  state: string;
  hoitripphoto?: HoitripPhoto[];
}

const HoiTripsDetails = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [guestTotal, setGuestTotal] = useState<number>(4);
  const { allProperties, setAllProperties } = useImages();
  const [loading, setLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Hoitrip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [success, setSuccess] = useState(false); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
   
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
       if (name === 'phone') {
    const onlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
   if (onlyDigits.startsWith('0')) {
        if (onlyDigits.length <= 11) {
          setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        }
      } else {
        if (onlyDigits.length <= 10) {
          setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        }
      }
      }
        else if (name === 'first_name' || name === 'last_name') {
          const onlyAlphabets = value.replace(/[^a-zA-Z\s]/g, ''); // allow letters and spaces
          setFormData((prev) => ({ ...prev, [name]: onlyAlphabets }));
        }
      else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  const params = useParams();
  const slug = params?.slug as string;

  const fetchHoiTrips = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hoitrip`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
      });

      const data = response.data;
       setAllProperties(data.data);
       const found = data.data.find((item: Hoitrip) => item.slug === slug);
       setTrip(found || null);
     
      
    } catch (error) {
      console.error("Error fetching hoitrips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoiTrips();
  }, []);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSuccess(false);
  //   const payload = {
  //     ...formData,
  //     start_date: startDate,
  //     guest:guestTotal,
  //     hoitrip_id: trip?.id,
  //     total: trip?.price,
  //     status:0, 
  //   };
  //   try {
  //     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/hoitrip/booking`, payload, {
  //       headers: {
  //         "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
  //       },
  //     });
      
  //     setSuccess(true); 
  //     setFormData({
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     phone: '',
  //     message: '',
  //   });
  //   setStartDate(null);
  //   setGuestTotal(1);
  //   toast.success(' Booking Confirm successfully!');
  //   router.push('/pay-done',);
  //   } catch (error) {
  //     console.error("Booking failed:", error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSuccess(false);

  const payload = {
    ...formData,
    start_date: startDate,
    guest: guestTotal,
    hoitrip_id: trip?.id,
    total: trip?.price,
    status: 0,
  };

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/hoitrip/booking`, payload, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
      },
    });

    
    const bookingData = res.data?.data;

    if (bookingData) {
      setSuccess(true);
      toast.success('Booking Confirm successfully!');

      
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
      });
      setStartDate(null);
      setGuestTotal(1);

      
     router.push(`/pay-done?${new URLSearchParams({
        trx: bookingData.trx,
        first_name: bookingData.first_name,
        last_name: bookingData.last_name,
        start_date: bookingData.start_date,
        guest: bookingData.guest,
        package_price: bookingData.package_price,
        package_name: bookingData.package_name,
      })}`);

    }

  } catch (error) {
    console.error("Booking failed:", error);
    toast.error("Booking failed! Please try again.");
  }
};

	const renderSection1 = ({ result }: any) => {
		
		return (
			<div className="listingSection__wrap cstm-padding !space-y-3">
			

				
				<h2 className="text-2xl flex gap-2 font-semibold sm:text-3xl lg:text-4xl">
					{result?.title}
				</h2>

			
				<div className="flex items-center space-x-4 ">
					<div className="flex items-start">
						<MapPinIcon className="h-5 w-5" />
						
						<span className="ml-1">
  					{result?.address_line_1?.split(',').slice(1).join(',').trim()}
				</span>

					</div>
				</div>

				
				<div className="flex items-center">
					<Avatar imgUrl={result?.users?.profile_src} hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<div className="flex gap-2 ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="flex gap-2 font-medium text-neutral-900 dark:text-neutral-200">
							{`${result?.user?.first_name || ''} ${result?.user?.last_name || ''}`.trim()} <StartRating reviewCount={result?.reviews_count} point={result?.avg_rating} />
						</span>
					</div>
				</div>

				
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					{
						result?.duration > 0 &&
						<div className="flex items-center space-x-3">
              <CalendarIcon className="h-6 w-6" />
							<span className=" ">
								<span className="hidden sm:inline-block">Total Days: </span> {result?.duration}
							</span>
						</div>
					}

					{
						result?.accommodate > 0 &&
						<div className="flex items-center space-x-3">
							<UsersIcon className="h-6 w-6" />
							<span className="">
								<span className="hidden sm:inline-block">Total Capacity:</span> {result?.accommodate}
							</span>
						</div>
					}
        </div>
			</div>
		)
	}
    const renderSection2 = ({ description }: any) => {
            return (
                <div className="listingSection__wrap cstm-padding">
                    <h2 className="text-2xl font-semibold">Stay information</h2>
                    {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
                    <div className="text-neutral-600 dark:text-neutral-300 mt-3">
                        <span>
                            {description?.description ? parse(description?.description) : ''}
                        </span>
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-300 mt-3">
                        <span>
                            {description?.content ? parse(description?.content) : ''}
                        </span>
                    </div>
                </div>
            )
     }   
      const includesExcludes = ({ includeExclude }: any) => {
            return (
                <div className="listingSection__wrap cstm-padding">
                    
                    {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
                    <div className="text-neutral-600 dark:text-neutral-300 mt-3">
                        <span className ="customListedStyle">
                            {includeExclude?.includes ? parse(includeExclude?.includes) : ''}
                        </span>
                    </div>
                      
                    {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
                    <div className="text-neutral-600 dark:text-neutral-300 mt-3">
                        <span className ="customListedStyle">
                            {includeExclude?.excludes ? parse(includeExclude?.excludes) : ''}
                        </span>
                    </div>
                     
                    {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
                    <div className="text-neutral-600 dark:text-neutral-300 mt-3">
                        <span className ="customListedStyle">
                            {includeExclude?.generalrules ? parse(includeExclude?.generalrules) : ''}
                        </span>
                    </div>
                </div>
            )
        } 
     
        const renderSection6 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
			

				{/* Content */}
				<div className="space-y-2 mt-3">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-3">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}
  const sideBar = ({sideBarHoiTrips} : any) =>{
      return(
          <>
            <div className="listingSectionSidebar__wrap shadow-xl mt-[6rem] sm:mt-0 cstm-padding">
                    {/* PRICE */}
                  <div className="flex justify-between">
					          <span className="text-xl font-semibold">
                       
                        ₹{sideBarHoiTrips?.price}
                        <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                          /Per Person
                        </span>
                      </span>
                      <StartRating point={sideBarHoiTrips?.avg_rating} reviewCount={sideBarHoiTrips?.reviews_count} />
                    </div>
                    <form className="flex flex-col rounded-3xl" onSubmit={handleSubmit}>
                      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-700">
                        <StayDatesRangeInput
                          startDate={startDate}
                          setStartDate={setStartDate}
                          hoitripdates={sideBarHoiTrips?.hoitripdates}
                          pricePackage={sideBarHoiTrips?.price}
                          className="z-[11] flex-1"
                          />
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                        	<GuestsInput onTotalChange={setGuestTotal} className="flex-1"/>
                          </div>
                          
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 mt-5">
                                {/* First Name */}
                                <div className="relative">
                                  <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full border border-[#dedede] rounded-3xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-black-500"
                                  />
                                  <label
                                    htmlFor="first_name"
                                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black-500"
                                  >
                                    First Name
                                  </label>
                                </div>

                                {/* Last Name */}
                                <div className="relative">
                                  <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full border border-[#dedede] rounded-3xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-black-500"
                                  />
                                  <label
                                    htmlFor="last_name"
                                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black-500"
                                  >
                                    Last Name
                                  </label>
                                </div>

                                {/* Email */}
                                <div className="relative">
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full border border-[#dedede] rounded-3xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-black-500"
                                  />
                                  <label
                                    htmlFor="email"
                                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black-500"
                                  >
                                    Email
                                  </label>
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    inputMode="numeric"
                                    className="peer w-full border border-[#dedede] rounded-3xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-black-500"
                                  />
                                  <label
                                    htmlFor="phone"
                                    className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black-500"
                                  >
                                    Phone
                                  </label>
                                </div>
                              </div>

                              {/* Message (optional) */}
                              <div className="mt-6 relative">
                                <textarea
                                  id="message"
                                  name="message"
                                  rows={4}
                                  value={formData.message}
                                  onChange={handleChange}
                                  placeholder=" "
                                  className="peer w-full border border-[#dedede] rounded-3xl px-4 pt-6 pb-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black-500"
                                />
                                <label
                                  htmlFor="message"
                                  className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black-500"
                                >
                                  Message (optional)
                                </label>
                              </div>
                             <div className="mt-3 flex justify-center">
                                <ButtonPrimary type="submit">Confirm Booking</ButtonPrimary>
                               
                                  {/* <ToastAlert
                                    message="Booking Confirm successfully!"
                                    show={success}
                                    onClose={() => setSuccess(false)}
                                  /> */}
                              
                            </div>
                    </form>
              </div>
          </>
      );
  }
  return (
    <React.Fragment>
      <header className="rounded-md mt-3 container">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 relative">
          {/* Large Left Image */}
          <div className="sm:col-span-6">
            <Image
              src={trip?.hoitripphoto?.[0]?.photo || ""}
              height={300}
              width={300}
              alt="Main Photo"
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(0)}
            />
          </div>

          {/* Grid of 4 Small Right Images */}
          <div className="sm:col-span-6 grid grid-cols-2 gap-2">
            {trip?.hoitripphoto?.slice(1, 5).map((photo, index) => (
              <Image
                key={photo.id}
                src={photo.photo}
                height={145}
              width={145}
                alt={`Trip photo ${photo.serial}`}
                className="w-full h-[145px] sm:h-[195px] object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(index + 1)}
              />
            ))}
          </div>

          {/* Show All Photos Button */}
          <button
            className="absolute bottom-3 left-3 z-10 hidden md:flex items-center justify-center rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200"
            onClick={() => openModal(0)}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="ml-2 text-sm font-medium text-neutral-800">Show all photos</span>
          </button>
        </div>
      </header>
      
      {isModalOpen && trip && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden p-6">
      {/* Close Button */}
      <button
        className="absolute top-4 left-4 text-black bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
        onClick={closeModal}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>

      {/* Main Content: Left Text + Right Large Image */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Text Block */}
        <div className="space-y-4">
          <Image src="/logo.svg" alt="Homestays" className="h-10" height={145} width={145} />
          <h2 className="text-xl font-semibold text-gray-700">
            Where Families Find Comfort, and Every Stay Feels Like Home.
          </h2>
          <p className="text-gray-600">
            Home Stay is more than a place to sleep — it’s where families gather,
            laughter echoes through the halls, and every stay feels like coming home.
          </p>
        </div>

        {/* Right: Main Selected Image */}
        <div className="flex justify-center">
          <Image
            src={trip.hoitripphoto?.[selectedIndex]?.photo || ""}
            alt="Selected"
            height={300}
            width={300}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-md"
          />
        </div>
      </div>


      {/* Thumbnail Gallery */}
      <div className="mt-6 flex overflow-x-auto gap-3">
        {trip.hoitripphoto?.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className={`min-w-[100px] border-2 ${
              selectedIndex === index ? "border-black-500" : "border-transparent"
            } rounded-md cursor-pointer overflow-hidden`}
          >
            <Image
              src={photo.photo}
              alt={`Thumb ${index}`}
              className="w-full h-24 object-cover"
                height={145}
              width={145}
            />
            <p className="text-center text-sm font-medium p-1">
              {photo.serial === 1
                ? "Entry Point"
                : `Image ${photo.serial}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
<main className={`relative mt-11 flex flex-col lg:flex-row container`}>
    <div className="w-full space-y-8 lg:w-3/5 xl:w-2/3 lg:space-y-5 lg:pr-10">
        {trip && renderSection1({ result: trip })}
        {trip && renderSection2({ description:trip })}
        {trip && includesExcludes({includeExclude:trip})}
        {trip && renderSection6()}
    </div>
    <div className="mt-14 lg:mt-0 lg:w-2/5 xl:w-1/3">
					<div className="relative top-0">{trip && sideBar({sideBarHoiTrips : trip})}</div>
				</div>
</main>
     {/* <h1 className="text-2xl font-bold mb-4">Image Gallery by Category</h1>
      <CategoryImageSlider /> */}
    </React.Fragment>
  );
};

export default HoiTripsDetails;
