'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import {
	ArrowRightIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Amenities_demos, PHOTOS, Activities_demos, Local_attraction_demos, Excursions_attraction_demos } from './constant'
import { Route } from 'next'
import axios from 'axios'
import GuestsInput from './GuestInput'
import StayDatesRangeInput from './StayDateRangeInput'
import SectionDateRange from '../../SectionDateRange'
import GoogleMapComponent from '@/components/GoogleMapComponent'
import { useImages } from '@/app/contextApi/ImageContext'
import GallerySlider2 from '@/components/GallerySlider2'
import GallerySlider from '@/components/GallerySlider'
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaBaby } from "react-icons/fa";
import CustomRoomModal from './CustomRoomModal'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import PriceCalculator from './PriceCalculator'
import parse from 'html-react-parser';
import GallerySlider3 from '@/components/GallerySlider3'
import ModalSelectDate from '@/components/ModalSelectDate'
import ModalReserveMobile from '../../(components)/ModalReserveMobile'
import { setPriority } from 'node:os'
import { after } from 'lodash'
import CategoryImageSlider from '@/components/CategoryImageSlider'


export interface ListingStayDetailPageProps { }


const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ }) => {
	//

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)
	const[cleaningFee, setCleaningFee] = useState<any>(0)
	const[securityFee, setSecurityFee] = useState<any>(0)
	const[weekendPrice, setWeekendPrice] = useState<any>(0)
	const [listingDetail, setListingDetail] = useState<any>({})
	const [daysToStay, setDaysToStay] = useState<number>(1)
	const [totalFee, setTotalFee] = useState<number>(0)
	const { setImagess } = useImages()
	const [activeModal, setActiveModal] = useState<number | null>(null);
	const [categorizedRooms, setCategorizeRooms] = useState<any>([])
	const [roomPrice, setRoomPrice] = useState<number>(0)
	const [selectedRooms, setSelectedRooms] = useState<any[]>([]);
	const [propertyDates, setPropertyDates] = useState<any>([]);
	const [adjustedNightPrice, setAdjustedNightPrice] = useState<number>(0);
	const [currentActiveRoom, setCurrentActiveRoom] = useState<any>({
		type: '',
		count: 1,
		accommodates: 0,
		guest_fee: 0,
		guest_after: 0,
		total_accommodates: 0,
		price: 0
	})

	const [surgedPrice, setSurgedPrice] = useState<any>()
	const [convenienceFee, setConvenienceFee] = useState<any>()
	const [gst, setGst] = useState<any>()
	const [workationDiscount, setWorkationDiscount] = useState<any>(0)
	const [discountWorkation, setDiscountWorkation] = useState<any>(0);
	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0)
	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState<number>(0);
	const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0)
	const [extraGuest, setExtraGuest] = useState<any>(0)
	const [guestLimitExceed, setGuestLimitExceed] = useState<boolean>(false)
	const [selectGuestWarning, setSelectGuestWarning] = useState<boolean>(false)
	const [selectRoomFirstWarning, setSelectRoomFirstWarning] = useState<any>(false)
	const [numberOfRoomSelected, setNumberOfRoomSelected] = useState<any>(0)
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [propertiesPhotos, setPropertiesPhotos] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const getRoomPrice = (currentActiveRoom: any) => {
		const price = listingDetail?.rooms?.find((room: any) => room?.room_type?.name.toLowerCase() === currentActiveRoom?.toLowerCase())?.room_price
		return price;
	}



	// const currentroomPrice = getRoomPrice(currentActiveRoom?.type || 'Classic')
  const currentroomPrice =
  selectedRooms.length === 1
    ? selectedRooms[0].room_price
    : selectedRooms.length > 1
      ? Math.min(...selectedRooms.map(r => r.room_price))
      : getRoomPrice(currentActiveRoom?.type || 'Classic');

	// calender variables 
	const [startDate, setStartDate] = useState<any>(
		new Date(),
	)
	// const [endDate, setEndDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	});


	function getImageUrlsBySpaceType(spaceType: any) {
		return listingDetail?.result?.property_photos?.filter((photo: any) => photo.space_type === spaceType)
			.map((photo: any) => photo.image_url);
	}
	function getImageMessageBySpaceType(spaceType: any) {
		return listingDetail?.result?.property_photos?.filter((photo: any) => photo.space_type === spaceType)
			.map((photo: any) => photo.message);
	}



	const thisPathname = usePathname()
	let endPoint = thisPathname.split('/').pop();
	const router = useRouter()


	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true)
	}

	const handleOpenModalImageGallery = () => {
		// router.push(`${endPoint}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
		setIsModalOpen(true);
	}
	  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

	const handleRoomChange = (roomType: any, pricePerRoom: any, newSelectedRooms: any) => {
		const prevSelectedRooms = selectedRooms[roomType] || 0;

		// Calculate the price difference
		const priceDifference = (newSelectedRooms - prevSelectedRooms) * pricePerRoom;

		// Update the state with the new selection
		setSelectedRooms((prevState: any) => ({
			...prevState,
			[roomType]: newSelectedRooms,

		}));

		localStorage.setItem("rooms", JSON.stringify(selectedRooms))
		// console.log(rooms,'rupesh')
		// Update the total price
		setRoomPrice((prevTotal: any) => prevTotal + priceDifference);
	};

	const calculateTotalFee = () => {
		// const price = listingDetail?.result?.property_price?.price ?? 0;
		const guestFee = listingDetail?.rooms?.[0]?.room_pricing?.[0]?.guest_fee ?? 0;
		const securityFee = listingDetail?.rooms?.[0]?.room_pricing?.security_fee ?? 0;
		// const cleaningFee = listingDetail?.result?.property_price?.cleaning_fee ?? 0;
		const totalDays = daysToStay;

		// Calculate total fee
		const total = (roomPrice * totalDays) + guestFee + securityFee;

		// Set the total fee
		setTotalFee(total);
	}

	// const calculateTotalFee = () => {
	// 	const guestFee = listingDetail?.result?.property_price?.guest_fee ?? 0;
	// 	const securityFee = listingDetail?.result?.property_price?.security_fee ?? 0;
	// 	const totalDays = daysToStay;

	// 	// Loop through each date in the range
	// 	let totalRoomPrice = 0;
	// 	let currentDate = new Date(startDate);

	// 	for (let i = 0; i < totalDays; i++) {
	// 	  const dateStr = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
	// 	  const datePrice = propertyDates.find((item: any) => item.date === dateStr)?.price || roomPrice;

	// 	  totalRoomPrice += datePrice;
	// 	  currentDate.setDate(currentDate.getDate() + 1); // Move to next date
	// 	}

	// 	const total = totalRoomPrice + guestFee + securityFee;
	// 	setTotalFee(total);
	//   };

			{/*Calendar Price total*/}
			// const getDateRange = (start: Date, end: Date): string[] => {
			// const dates: string[] = [];
			// let current = new Date(start);
			// while (current <= end) {
			// 	dates.push(current.toISOString().split("T")[0]);
			// 	current.setDate(current.getDate() + 1);
			// }
			// return dates;
			// };
			// const getAveragePriceAdjustment = (selectedDates: string[], propertyDates: any[]) => {
			// const matched = propertyDates.filter((pd) => selectedDates.includes(pd.date));
			// const totalPercent = matched.reduce((sum, pd) => sum + (pd.price || 0), 0);
			// const average = matched.length ? totalPercent / matched.length : 0;
			// return average;
			// };
			// const selectedDates: string[] = startDate && endDate
			// 	? getDateRange(startDate, endDate)
			// 	: [];
			// const priceAdjustmentPercent = getAveragePriceAdjustment(selectedDates, propertyDates);

			const getDateRange = (start: Date, end: Date): string[] => {
					const dates: string[] = [];
					let current = new Date(start);

				
					while (current < end) {
						dates.push(current.toISOString().split("T")[0]);
						current.setDate(current.getDate() + 1);
					}

					return dates;
					};


				const getRoomCalendarBasedTotal = (
					room: any,
					selectedDates: string[],
					propertyDates: { date: string; price: number }[]
					) => {
					return selectedDates.reduce((sum, dateStr) => {
						const day = propertyDates.find(d => d.date === dateStr);
						const pricePercent = day?.price ?? 0;
						const adjustedPrice = room.room_price + (room.room_price * pricePercent / 100);
						return sum + adjustedPrice * room.count;
					}, 0);
					};


			{/*End Calendar Price total*/}
	useEffect(() => {
		calculateTotalFee()
	}, [listingDetail, daysToStay, roomPrice, startDate, endDate]);
    // console.log(roomPrice, "roomPriceTest")
	//console.log(listingDetail, "listingDetailTest")
	// ---------------
	// const [listingDetail, setListingDetail] = useState<any>({})
	const [listingDescription, setListingDescription] = useState<any>()

	// propety list 
	const fetchListingDetails = useCallback(async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${endPoint}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			});
			// console.log(data,"jdfhklaslkjasld")
			if (data.status === 'success') {
				setListingDetail(data.data);
				setPropertyDates(data?.data?.result?.property_dates || []);
				setPropertiesPhotos(data?.data?.result?.property_photos || []);
				const rooms = categorizeRooms(data?.data?.rooms)
			
				setCategorizeRooms(rooms)
				setConvenienceFee(data?.data?.fixedfees[0]?.convenience)
				setGst(data?.data?.fixedfees[0]?.gst)
				const photos = data.data.result?.property_photos;
				// ?.map((photo: any) => photo.image_url) 
				setImagess(photos || [])
				
			}
		} catch (error) {
			console.error(error);
		}
	}, [endPoint])
	
	console.log(propertyDates, "propertyDatesNow")
	// propety list description
	const fetchListingDescription = useCallback(async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property-details/${endPoint}`, {
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
				},
			});
			if (data.status === 'success') {
				setListingDescription(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [endPoint])

	useEffect(() => {
		fetchListingDetails()
		fetchListingDescription()
	}, [fetchListingDetails, fetchListingDescription])

	const categorizeRooms = (rooms: any) => {
		const categorized: any = {}

		for (const room of rooms) {


			const roomType = room?.room_type?.name;

			if (!categorized[roomType]) {

				categorized[roomType] = {
					room_type: roomType,
					room_price: room.room_price,
					beds: room.beds,
					bathrooms: room.bathrooms,
					space_type: room?.space_type,
					accommodates: room?.accommodates,
					total_accommodates: room?.total_accommodates,
					guest_fee: room?.room_pricing[0]?.guest_fee,
					weekly_discount: room?.room_pricing[0]?.weekly_discount,
					cleaning_fee: room?.room_pricing[0]?.cleaning_fee,
					security_fee: room?.room_pricing[0]?.security_fee,
					weekend_price: room?.room_pricing[0]?.weekend_price,
					fortnight_discount: room?.room_pricing[0]?.fortnight_discount,
					monthly_discount: room?.room_pricing[0]?.monthly_discount,
					total_rooms: 1,
					roomid: room.id,
					guest_after: room?.room_pricing[0]?.guest_after,
				}
				// console.log(room?.space_type,"ddvvv")
			} else {
				categorized[roomType].total_rooms += 1;
			}
		}

		return Object.values(categorized);
	}

useEffect(() => {
  const selectedRooms = currentActiveRoom?.rooms || [];

  const count = selectedRooms.reduce((acc: any, room: any) => acc + (room.count || 0), 0);
  setNumberOfRoomSelected(count);
}, [currentActiveRoom]);

const handleErrorMessageDisplay = (openModal: any) => {
  const totalGuests = guestAdultsInputValue + guestChildrenInputValue + extraGuest;
  const selectedRooms = currentActiveRoom?.rooms || [];

  let accommodates = 0;
  let guestAfter = 0;

  // Calculate total accommodates and total guest_after
  selectedRooms.forEach((room: any) => {
    const count = Number(room.count) || 0;
    const roomAccommodates = Number(room.accommodates) || 0;
    const roomGuestAfter = Number(room?.guest_after) || 0;

    accommodates += roomAccommodates * count;
    guestAfter += roomGuestAfter * count;

    console.log(`GuestAfter: ${roomGuestAfter}, Count: ${count}, Accommodates: ${roomAccommodates}`);
  });

  const totalAccommodates = accommodates + guestAfter;

  console.log("Room count:", numberOfRoomSelected);
  console.log("Total Accommodates (with guest_after):", totalAccommodates);
  console.log("Guest Total:", totalGuests);

  if (numberOfRoomSelected === 0 || selectedRooms.length === 0) {
    setSelectRoomFirstWarning?.(true);
    setSelectGuestWarning?.(false);
    setGuestLimitExceed?.(false);
  } else if (totalGuests === 0) {
    setSelectRoomFirstWarning?.(false);
    setSelectGuestWarning?.(true);
    setGuestLimitExceed?.(false);
  } 
  else if (totalGuests  > totalAccommodates )
	{
    setSelectRoomFirstWarning?.(false);
    setSelectGuestWarning?.(false);
    setGuestLimitExceed?.(true);
  } 
  else {
    setSelectRoomFirstWarning?.(false);
    setSelectGuestWarning?.(false);
    setGuestLimitExceed?.(false);
    openModal();
  }
};



useEffect(() => {
  if (guestAdultsInputValue + guestChildrenInputValue - extraGuest > numberOfRoomSelected) {
    handleErrorMessageDisplay(() => {});
  }
}, [guestAdultsInputValue, guestChildrenInputValue, extraGuest, numberOfRoomSelected, currentActiveRoom, handleErrorMessageDisplay]);

// useEffect(() => {
// 		let grossSum = 0;
// 		let discountSum = 0;
// 		 if (!selectedRooms || selectedRooms.length === 0) {
// 				setCleaningFee(0);
// 				setSecurityFee(0);
// 				setWeekendPrice(0);
// 				return;
// 			}
// 		selectedRooms.forEach((room) => {
// 			const baseNightlyPrice = room.room_price;
// 			const adjustment = baseNightlyPrice * priceAdjustmentPercent / 100;
// 			const adjustedNightlyPrice = baseNightlyPrice + adjustment;
			
// 				let discountPercent = 0;
// 				if (daysToStay >= 30 && room?.monthly_discount > 0) {
// 				discountPercent = room.monthly_discount;
// 				} else if (daysToStay >= 15 && room?.fortnight_discount > 0) {
// 				discountPercent = room.fortnight_discount;
// 				} else if (daysToStay >= 7 && room?.weekly_discount > 0) {
// 				discountPercent = room.weekly_discount;
// 				}

// 				const gross = adjustedNightlyPrice * room.count * daysToStay;
// 				//console.log("gross:", gross, "adjustedNightlyPrice:", adjustedNightlyPrice, "room.count:", room.count, "daysToStay:", daysToStay, "discountPercent:", discountPercent);
// 				const discount = (gross * discountPercent) / 100;
// 				const final = gross - discount;
//                 //console.log("room:", room, "adjustedNightlyPrice:", adjustedNightlyPrice, "gross:", gross, "discount:", discount, "final:", final);
// 				grossSum += final;
// 				discountSum += discount;
// 				setDiscountPercentage(discountPercent); 
// 				setAdjustedNightPrice(adjustedNightlyPrice);
// 			});
// 				const cleaning = selectedRooms.reduce(
// 					(sum, room) => sum + ((room.cleaning_fee || 0) * (room.count || 1)),
// 					0
// 				);

// 				const security = selectedRooms.reduce(
// 					(sum, room) => sum + ((room.security_fee || 0) * (room.count || 1)),
// 					0
// 				);

// 				const weekend = selectedRooms.reduce(
// 					(sum, room) => sum + ((room.weekend_price || 0) * (room.count || 1)),
// 					0
// 				);
// 		setWorkationDiscount(discountSum);      
// 		setTotalPrice(grossSum); 
// 		setCleaningFee(cleaning);
// 		setSecurityFee(security);
// 		setWeekendPrice(weekend); 
		              
// 		}, [selectedRooms, daysToStay, priceAdjustmentPercent]);

			useEffect(() => {
			let grossSum = 0;
			let discountSum = 0;

			if (!selectedRooms || selectedRooms.length === 0) {
				setCleaningFee(0);
				setSecurityFee(0);
				setWeekendPrice(0);
				return;
			}

			const selectedDates: string[] = startDate && endDate
				? getDateRange(startDate, endDate)
				: [];

			selectedRooms.forEach((room) => {
				const roomTotal = getRoomCalendarBasedTotal(room, selectedDates, propertyDates);

				// Discount logic
				let discountPercent = 0;
				if (daysToStay >= 30 && room.monthly_discount > 0) {
				discountPercent = room.monthly_discount;
				} else if (daysToStay >= 15 && room.fortnight_discount > 0) {
				discountPercent = room.fortnight_discount;
				} else if (daysToStay >= 7 && room.weekly_discount > 0) {
				discountPercent = room.weekly_discount;
				}
				setDiscountPercentage(discountPercent);
				const discountAmount = (roomTotal * discountPercent) / 100;
				const finalRoomPrice = roomTotal - discountAmount;

				grossSum += finalRoomPrice;
				discountSum += discountAmount;
			});

			// Additional Fees
			const cleaning = selectedRooms.reduce(
				(sum, room) => sum + ((room.cleaning_fee || 0) * (room.count || 1)),
				0
			);
			const security = selectedRooms.reduce(
				(sum, room) => sum + ((room.security_fee || 0) * (room.count || 1)),
				0
			);
			const weekend = selectedRooms.reduce(
				(sum, room) => sum + ((room.weekend_price || 0) * (room.count || 1)),
				0
			);

			setWorkationDiscount(discountSum);      
			setTotalPrice(grossSum); 
			setCleaningFee(cleaning);
			setSecurityFee(security);
			setWeekendPrice(weekend);
			}, [selectedRooms, startDate, endDate, propertyDates]);



	const renderSection1 = ({ result }: any) => {
		// console.log(result,"rddgg")
		return (
			<div className="listingSection__wrap cstm-padding !space-y-3">
				{/* 1 */}
				{/* <div className="flex items-center justify-between">
					<Badge name="Wooden house" />
					<LikeSaveBtns />
				</div> */}

				{/* 2 */}
				<h1 className="text-4xl flex gap-2 font-semibold sm:text-3xl lg:text-4xl">
					{result?.name}
				</h1>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<div className="flex items-start">
						<MapPinIcon className="h-5 w-5" />
						{/* <span className="ml-1">  {result?.property_address?.address_line_1}</span> */}
						<span className="ml-1">
  					{/* {result?.property_address?.address_line_1?.split(',').slice(1).join(',').trim()} */}
					{result?.property_address?.display_address !== null ? result?.property_address?.display_address : result?.property_address?.address_line_1?.split(',').slice(1).join(',').trim()}
				</span>

					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar imgUrl={result?.users?.profile_src} hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<div className="flex gap-2 ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="flex gap-2 font-medium text-neutral-900 dark:text-neutral-200">
							{result?.host_name} <StartRating reviewCount={result?.reviews_count} point={result?.avg_rating} />
						</span>
					</div>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					{
						result?.bedrooms > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M3 22H21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4 22V6C4 2.69067 4.78933 2 8.57143 2H15.4286C19.2107 2 20 2.69067 20 6V22"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.92 11.7592V9.85424C13.92 8.8324 13.0604 8.00403 12 8.00403C10.9396 8.00403 10.08 8.8324 10.08 9.85424V11.7592M15 14.0843C15 15.6952 13.6462 17.004 12 17.004C10.3538 17.004 9 15.6952 9 14.0843C9 12.374 10.3538 11.0739 12 11.0739C13.6462 11.0739 15 12.374 15 14.0843Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								<span className="hidden sm:inline-block">No. of Rooms: </span> {result?.bedrooms}
							</span>
						</div>
					}

					{
						result?.accommodates > 0 &&
						<div className="flex items-center space-x-3">
							<UsersIcon className="h-6 w-6" />
							<span className="">
								<span className="hidden sm:inline-block">Total Capacity:</span> {result?.accommodates}
							</span>
						</div>
					}

					{/* {
						result?.beds > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M22 17.5H2"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								{result?.accommodates} <span className="hidden sm:inline-block">beds</span>
							</span>
						</div>
					} */}

					{
						result?.bathrooms > 0 &&
						<div className="flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={24}
								height={24}
								color={'currentColor'}
								fill={'none'}
								className="h-6 w-6"
							>
								<path
									d="M6 20L5 21M18 20L19 21"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M2 12H22"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M8 6L10.5 4"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className=" ">
								{result?.bathrooms} <span className="hidden sm:inline-block">Baths</span>
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
						{description?.summary ? parse(description?.summary) : ''}
					</span>
				</div>
			</div>
		)
	}

	// amenities 
	const renderSection3 = ({ amenities }: any) => {

		return (
			<>
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Facilities </h2>
					{/* <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's amenities and services`}
					</span> */}
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap mt-3">
					{amenities?.Facilities?.filter((_: any, i: any) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg> */}
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item.title}</span>
						</div>
					))}
				</div>

				{/* ----- */}
				{/* <div className="w-14 border-b border-neutral-200"></div> */}
				{/* <div> */}
					{/* <ButtonSecondary onClick={openModalAmenities}> */}
						{/* <ButtonSecondary onClick={() => { 
						openModalAmenities();
						renderModalAmenities(listingDetail?.amenities); 
					}}> */}
						{/* View more amenities
					</ButtonSecondary> */}
				{/* </div> */}
				{/* {renderModalAmenities()} */}
				{/* {amenities?.Inclusive.length > 0 && (
					<>
						<h2 className="text-2xl font-semibold">Inclusive</h2>
						<div className="flex gap-5 flex-wrap">
						{amenities.Inclusive.map((item: any) => (
							<div key={item.id} className="flex items-center space-x-3">
							<strong className="text-[1.5rem] text-gray-500">&bull;</strong>
							<span>{item.title}</span>
							</div>
						))}
						</div>
					</>
					)} */}
					{/* {amenities?.Exclusive.length > 0 && (
						<>
				<h2 className="text-2xl font-semibold">Exclusive </h2>
				<div className="flex gap-5 flex-wrap">
					{amenities?.Exclusive?.map((item: any)  => (
						<div key={item.id} className="flex items-center space-x-3">
						
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span>{item.title}</span>
						</div>
					))}
				</div>
				</>
					)} */}
			</div>
			
			
			</>
		)
	}

	const renderModalAmenities = () => {
		return (
			<Dialog
				open={isOpenModalAmenities}
				onClose={closeModalAmenities}
				className="relative z-50 hidden lg:block"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
				/>
				<div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center p-4">
					<DialogPanel
						className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out data-[closed]:translate-y-16 data-[closed]:opacity-0 dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
						transition
					>
						<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
							<DialogTitle
								as="h3"
								className="text-lg font-medium leading-6 text-gray-900"
							>
								Amenities
							</DialogTitle>
							<span className="absolute left-3 top-3">
								<ButtonClose onClick={closeModalAmenities} />
							</span>
						</div>

						<div className="hiddenScrollbar flex-1 divide-y divide-neutral-200 overflow-y-auto px-8 text-neutral-700 dark:divide-neutral-700 dark:text-neutral-300">
							{listingDetail?.amenities?.Facilities?.map((item: any) => (
								<div
									key={item?.id}
									className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span>{item?.title}</span>
								</div>
							))}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		)
	}

	const renderSafetyAmenities = ({ amenities }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Safety Amentites </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's safety amenities and services`}
					</span>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap mt-3">
					{amenities?.SafetyAmenities?.map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item.title}</span>
						</div>
					))}
				</div>
			</div>
		)
	}
	const renderInclusive = ({ allNewAmenities }: any) => {
		console.log("inclusive =", allNewAmenities )
		return (
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Inclusive</h2>
				
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap">
					{allNewAmenities?.Inclusive?.map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item.title}</span>
							
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Monday - Thursday</span>
							<span>₹199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>₹219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = ({ result }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-3"></div>

				{/* host */}
				<div className="flex items-center space-x-4 mt-3">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							{result?.users?.first_name} {result?.users?.last_name}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							{/* <span className="mx-2">·</span>
							<span> 12 places</span> */}
						</div>
					</div>
				</div>


				{/* info */}
				{
					result?.users?.description &&
					<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
						<h2 className='text-black font-bold'>Description:</h2>
						<p>{result?.users?.description}</p>
					</div>
				}

				{/* == */}
				{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">See host profile</ButtonSecondary>
				</div> */}
			</div>
		)
	}

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-3"></div>

				{/* Content */}
				<div className="space-y-3 mt-3">
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
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
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

	const renderSection7 = ({ result }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">How to reach</h2>
					<div className="text-neutral-600 dark:text-neutral-300 mt-3">
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400 mt-3">
							{description?.place_is_great_for ? parse(description?.place_is_great_for) : ''}
						</span>
					</div>
				</div>
				

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3 mt-3">
					<div className="z-0 overflow-hidden rounded-xl">
						{/* <iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe> */}

						<GoogleMapComponent latitude={result?.property_address?.latitude || 0.0} longitude={result?.property_address?.longitude || 0.0} />
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					{description?.interaction_guests}
				</div>
			</div>
		)
	}

	const renderSection9 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<h2 className="text-2xl font-semibold">Child Policy</h2>

				{/* CONTENT */}
				<div className={'mt-3'}>
					{/* {description?.about_place ? parse(description?.about_place) : ''} */}
					Up to 6 years: Complimentary (no extra bed) <br/>
					7-12 years : 50% (with extra bed)
				</div>
			</div>
		)
	}

	const renderSection10 = () => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<h2 className="text-2xl font-semibold">Foods</h2>

				{/* CONTENT */}
				<div className='mt-3'>
					<span className="block text-neutral-600 dark:text-neutral-300">
						{description?.guest_can_access ? parse(description?.guest_can_access) : ''}
					</span>
				</div>
			</div>
		)
	}

	const renderSection11 = ({ description }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Activities  </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap mt-3">
					{description?.guestsactivity?.map((item: any, index: number) => (
						<div key={index} className="flex items-center space-x-3">
							{/* <strong className='text-[1.5rem] text-gray-500'>&bull;</strong> */}
							<span className="activities">{parse(item)}</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSection12 = ({ attractions }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Local Attractions </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap mt-3">
					{attractions?.filter((_: any, i: number) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-2">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item?.name} ({item?.property_distance})</span>
						</div>
					))}
				</div>
			</div>
		)
	}


	const renderSection13 = ({ excursions }: any) => {
		return (
			<div className="listingSection__wrap cstm-padding">
				<div>
					<h2 className="text-2xl font-semibold">Excursions </h2>
				</div>
				{/* 6 */}
				<div className="flex gap-5 flex-wrap mt-3">
					{excursions?.filter((_: any, i: number) => i < 12).map((item: any) => (
						<div key={item.id} className="flex items-center space-x-3">
							<strong className='text-[1.5rem] text-gray-500'>&bull;</strong>
							<span className=" ">{item?.name} ({item?.property_distance})</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderSidebar = ({ result }: any) => {
		const roomOrder = ["Classic", "Superior", "Premium"];
		console.log("selectRoomsTest:", selectedRooms);
		return (
			<div className="listingSectionSidebar__wrap shadow-xl mt-[6rem] sm:mt-0 cstm-padding">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-xl font-semibold">
					₹{roomPrice}
						 <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating point={result?.avg_rating} reviewCount={result?.reviews_count} />
				</div>


				{selectRoomFirstWarning && <span className='text-red-500 text-sm mt-3'>Kindly select any room to continue</span>}
				{selectGuestWarning && <span className='text-red-500 text-sm mt-3'>Kindly select the guests</span>}
				{guestLimitExceed && <span className='text-red-500 text-sm mt-3'>Kindly add more room / select extra guest</span>}

				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700 mt-3">
					<StayDatesRangeInput previousPrice={currentroomPrice} workation= {result?.property_type?.name} propertyDates={result?.property_dates} setDaysToStay={setDaysToStay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} className="z-[11] flex-1 cstm-btn-padding" />
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
						<GuestsInput
						setNumberOfRoomSelected={setNumberOfRoomSelected}
						numberOfRoomSelected={numberOfRoomSelected} 
						guestLimitExceed={guestLimitExceed} 
						setGuestLimitExceed={setGuestLimitExceed}
						currentActiveRoom={currentActiveRoom} 
						guestAdultsInputValue={guestAdultsInputValue}
						guestChildrenInputValue={guestChildrenInputValue}
						listingDetails={listingDetail}
						extraGuest={extraGuest}                     
						setExtraGuest={setExtraGuest}   
						guestInfantsInputValue={guestInfantsInputValue} 
						setGuestAdultsInputValue={setGuestAdultsInputValue} 
						setGuestChildrenInputValue={setGuestChildrenInputValue} 
						setGuestInfantsInputValue={setGuestInfantsInputValue}
						className="flex-1 cstm-btn-padding" />
				</form>


				{/* SUM */}
				
				{	
					roomPrice !== 0 &&
					<div className="flex flex-col space-y-1 mt-3">
						
						{selectedRooms.length > 0 && (
							<div className="flex flex-col space-y-1 text-neutral-600 dark:text-neutral-300">
								{selectedRooms
								.slice()
								.sort((a, b) => {
									const indexA = roomOrder.indexOf(a.type);
									const indexB = roomOrder.indexOf(b.type);
									return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
								})
								.map((room, index) => {
									const selectedDates: string[] = startDate && endDate ? getDateRange(startDate, endDate) : [];

									// Group adjusted price by percent
									const priceMap = new Map<number, number>(); // adjusted price => days count

									selectedDates.forEach(date => {
									const pd = propertyDates.find((p:any)=> p.date === date);
									const pricePercent = pd?.price ?? 0;
									const adjusted = room.room_price + (room.room_price * pricePercent / 100);
									const key = Math.round(adjusted); // group similar prices
									priceMap.set(key, (priceMap.get(key) || 0) + 1);
									});

									const groups = Array.from(priceMap.entries()).map(([adjusted, days]) => ({
									adjusted,
									days,
									total: adjusted * room.count * days
									}));

									// Discount logic
									let discountPercent = 0;
									if (daysToStay >= 30 && room.monthly_discount > 0) {
									discountPercent = room.monthly_discount;
									} else if (daysToStay >= 15 && room.fortnight_discount > 0) {
									discountPercent = room.fortnight_discount;
									} else if (daysToStay >= 7 && room.weekly_discount > 0) {
									discountPercent = room.weekly_discount;
									}
									
									const grossTotal = groups.reduce((sum, g) => sum + g.total, 0);
									const discountAmount = (grossTotal * discountPercent) / 100;

									return (
									<div key={index}>
										{groups.map((g, idx) => (
										<div key={idx} className="flex justify-between items-center">
											<span>
											₹{g.adjusted}/night {room.type} ({room.count}{" "}
											<span className="text-xs">
												{room.space_type === 8 ? "Person" : "room"}
											</span>{" "}
											x {g.days} day)
											</span>
											<span>₹{g.total}</span>
										</div>
										))}

										{discountPercent > 0 && (
										<div className="flex justify-between items-center">
											<span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
											{`Discount: ${discountPercent}%`}
											</span>
											<span>₹{discountAmount.toFixed(0)}</span>
										</div>
										)}
									</div>
									);
								})}
							</div>
							)}


						{/*		{selectedRooms.length > 0 && (
									<div className="flex flex-col space-y-1 text-neutral-600 dark:text-neutral-300">
										{selectedRooms
										.slice()
										.sort((a, b) => {
											const indexA = roomOrder.indexOf(a.type);
											const indexB = roomOrder.indexOf(b.type);
											return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
										})
										.map((room, index) => {
											
											console.log("room test:", room);
											const baseNightlyPrice = room.room_price;
											const adjustmentFromDatePricing = baseNightlyPrice * priceAdjustmentPercent / 100;
											const adjustedNightlyPrice = baseNightlyPrice + adjustmentFromDatePricing;

											
											let discountPercent = 0;
											if (daysToStay >= 30 && room?.monthly_discount > 0) {
											discountPercent = room.monthly_discount;
											console.log("Monthly Discount Test:", room?.monthly_discount);
											} else if (daysToStay >= 15 && room?.fortnight_discount > 0) {
											discountPercent = room.fortnight_discount;
											} else if (daysToStay >= 7 && room?.weekly_discount > 0) {
											discountPercent = room.weekly_discount;
											console.log("Weekly Discount Test:", discountPercent);
											}

											const grossTotal = adjustedNightlyPrice * room.count * daysToStay;
											console.log("grossTotal:", grossTotal);
											const discountAmount = (grossTotal * discountPercent) / 100;
											
											
											return (<>
											<div key={index} className="flex justify-between items-center">
												<span>
												₹{adjustedNightlyPrice.toFixed(0)}
												<span className="text-xs">/night</span>{" "}
												{room.space_type !== 8 ? room.type : ""} (
												{room.count}{" "}
												<span className="text-xs">
													{room.space_type === 8 ? "Person" : "room"}
												</span>{" "}
												x {daysToStay.toFixed(0)}{" "}
												<span className="text-xs">day</span>)
											
												</span>
												<span>₹{grossTotal.toFixed(0)}</span>
											</div>
											
												{discountPercent > 0 && (
													<>
													<div className="flex justify-between items-center">
													<span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
														{`Discount: ${discountPercent}%`}
													</span>
													<span>₹{discountAmount.toFixed(0)}</span>
													</div>
													</>
												)}
												</>
											);
										})}
									</div>
									)} */}

									

						{/* <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>
								<div>₹ {roomPrice} x {daysToStay} night</div>
								<div>₹ {currentroomPrice}<span className='text-xs'>/night</span>  ({numberOfRoomSelected} <span className='text-xs'>room</span> x {daysToStay.toFixed(0)} <span className='text-xs'>day</span>)</div>
								{workationDiscount > 0 && <div className='text-xs text-red-500'>{`Discount: ${workationDiscount}%`}</div>}
							</span>
							
							<span className='test'>
								<div>₹ {surgedPrice - (extraGuest * currentActiveRoom?.guest_fee)}</div>
								{workationDiscount > 0 && <span className='text-xs line-through'>₹ {roomPrice * daysToStay}</span>}
							</span>
						</div> */}
						
							{guestChildrenInputValue > 0 &&
								<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
										<span>Children ({guestChildrenInputValue} x ₹{currentActiveRoom?.rooms?.[0]?.space_type !== 8 ? ((currentActiveRoom?.guest_fee)/2) : ((currentActiveRoom?.rooms?.[0]?.room_price)/2)} x {daysToStay.toFixed(0)} <span className="text-xs">day</span>)</span>
										<span>
											₹{(guestChildrenInputValue *
												(
												currentActiveRoom?.rooms?.[0]?.space_type !== 8
													? (currentActiveRoom?.guest_fee ?? 0) / 2
													: (currentActiveRoom?.rooms?.[0]?.room_price ?? 0) / 2
												) *
												daysToStay
											).toFixed(0)}
											</span>
									</div>
									
							}
							{extraGuest > 0 &&
									<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
										<span>Extra Guest ({extraGuest} x ₹{currentActiveRoom?.guest_fee} x {daysToStay.toFixed(0)} <span className="text-xs">day</span>)</span>
										<span>₹{((extraGuest * currentActiveRoom?.guest_fee) * daysToStay).toFixed(0)}</span>
									</div>
									}
							{/* {selectedRooms?.length > 0 && (
									<>
										{selectedRooms[0]?.cleaning_fee > 0 && (
										<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
											<span>Cleaning Fee</span>
											<span>₹{selectedRooms[0].cleaning_fee}</span>
										</div>
										)}

										{selectedRooms[0]?.security_fee > 0 && (
										<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
											<span>Security Fee</span>
											<span>₹{selectedRooms[0].security_fee}</span>
										</div>
										)}

										{selectedRooms[0]?.weekend_price > 0 && (
										<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
											<span>Weekend Price</span>
											<span>₹{selectedRooms[0].weekend_price}</span>
										</div>
										)}
									</>
									)} */}
						{selectedRooms?.length > 0 && (
							<>
								{cleaningFee > 0 && (
								<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
									<span>Cleaning Fee</span>
									<span>₹{cleaningFee}</span>
								</div>
								)}

								{securityFee > 0 && (
								<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
									<span>Security Fee</span>
									<span>₹{securityFee}</span>
								</div>
								)}

								{weekendPrice > 0 && (
								<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
									<span>Weekend Price</span>
									<span>₹{weekendPrice}</span>
								</div>
								)}
							</>
							)}


						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>Convenience Fee ({convenienceFee}%)</span>
							<span>₹{((convenienceFee / 100) * surgedPrice).toFixed(0)}</span>
						</div>
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>GST ({gst}%)</span>
							<span>₹{((surgedPrice + ((convenienceFee / 100) * surgedPrice)+cleaningFee+securityFee+weekendPrice) * (gst / 100)).toFixed(0)}</span>
						</div>
						{/* {surgedPrice - (roomPrice * daysToStay) > 0 && 
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>Surge Price</span>
							<span>₹ {surgedPrice - (roomPrice * daysToStay)}</span>
						</div>} */}
						{/* {result?.property_price?.cleaning_fee >= 0 &&
						<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span>Cleaning Fee</span>
							<span>₹{result?.property_price?.cleaning_fee}</span>
						</div>
					} */}
						{/* {result?.property_price?.security_fee > 0 &&
							<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
								<span>Security Fee</span>
								<span>₹{result?.property_price?.security_fee}</span>
							</div>
						}
						{result?.property_price?.guest_fee > 0 &&
							<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
								<span>Guest Fee</span>
								<span>₹{result?.property_price?.guest_fee}</span>
							</div>
						} */}
						<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
						<div className="flex justify-between font-semibold">
							<span>Total</span>
							<span className='flex'>₹<PriceCalculator  totalPrice={totalPrice} setTotalPrice={setTotalPrice} extraGuest={extraGuest} extraGuestPrice={(currentActiveRoom?.guest_fee)*daysToStay} guestChildrenInputValue={guestChildrenInputValue} childrenPricePerHead={(currentActiveRoom?.rooms?.[0]?.space_type !==8 ? (currentActiveRoom?.guest_fee ?? 0) / 2 : (currentActiveRoom?.rooms?.[0]?.room_price ?? 0) / 2)*daysToStay} setWorkationDiscount={setWorkationDiscount}  workationDiscount={workationDiscount}  propertyType={listingDetail?.result?.property_type?.name} daysToStay={daysToStay.toFixed(2)} workStation={listingDetail?.WorkStation} startDate={startDate} endDate={endDate} normalFare={roomPrice} propertyDates={propertyDates} setSurgedPrice={setSurgedPrice} convenienceFee={convenienceFee} gst={gst} cleaningFee={cleaningFee} securityFee={securityFee} weekendFee={weekendPrice}/></span>
						</div>
					</div>
				}
			
               
					
					
				{/* SUBMIT */}
				{/* <ButtonPrimary href={'/checkout'} >Reserve</ButtonPrimary> */}
				<ModalReserveMobile
					renderChildren={({ openModal }) => (
						<ButtonPrimary
							sizeClass="px-5 sm:px-7 py-3 mt-3 !rounded-2xl"
							// onClick={openModal}
							// onClick={numberOfRoomSelected == 0 ? ()=>setGuestLimitExceed(true) : openModal}
							onClick={() => handleErrorMessageDisplay(openModal)}
						// onClick={()=>handleErrorMessageDisplay(true)}
						>
							Reserve
						</ButtonPrimary>
					)}
					startDate={startDate}
					endDate={endDate}
					guestAdultsInputValue={guestAdultsInputValue}
					guestChildrenInputValue={guestChildrenInputValue}
					guestInfantsInputValue={guestInfantsInputValue}
					currentroomPrice={currentroomPrice}
					numberOfRoomSelected={numberOfRoomSelected}
					daysToStay={daysToStay}
					discountPercentage={discountPercentage}
					workationDiscount={workationDiscount}
					surgedPrice={surgedPrice}
					extraGuest={extraGuest}
					currentActiveRoom={currentActiveRoom}
					convenienceFee={convenienceFee}
					adjustedNightPrice={adjustedNightPrice}
					selectedRooms={selectedRooms}
					cleaningFee={cleaningFee} 
					securityFee={securityFee} 
					weekendPrice={weekendPrice}
					gst={gst}
					roomPrice={roomPrice}
					totalPrice={totalPrice}
					result={result}
					
				/>
			</div>
		)
	}
	//    console.log(surgedPrice,"rtdgs")
	console.log(currentActiveRoom, "currentactiveRoom")
	const renderMobileSidebar = () => {
		return (
			<div className="fixed inset-x-0 bottom-0 z-40 block border-t border-neutral-200 bg-white py-2 dark:border-neutral-600 dark:bg-neutral-800 sm:py-3 lg:hidden">
				<div className="container flex items-center justify-between">
					<div className="">
						<span className="block text-md font-semibold">
							₹{roomPrice}
							<span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
								/night
							</span>
						</span>
						<div className='flex gap-2'>
							<ModalSelectDate
								setDaysToStay={setDaysToStay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
								renderChildren={({ openModal }) => (
									<span
										onClick={openModal}
										className="block text-xs font-medium underline"
									>
										{/* start-end */}
										{startDate && endDate
											? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
											: "Select dates"}
									</span>
								)}
							/>
							<a className="ml-1 text-xs font-normal text-neutral-500 dark:text-neutral-400 text-orange-500 underline" href='#sidebarr'> View Detail</a>
						</div>
					</div>
					<div>
						<ModalReserveMobile
							renderChildren={({ openModal }) => (
								<ButtonPrimary
									sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
									onClick={openModal}
								>
									Reserve
								</ButtonPrimary>
							)}
						/>
					</div>
				</div>
			</div>
		)
	}


		const renderRoomSection = ({ rooms }: any) => {
			// console.log(categorizedRooms,"ldk;lfklds")
			console.log(rooms,'rooms details')
			return (
				<>
					<div className='listingSection__wrap cstm-padding'>
						{
							categorizedRooms?.map((item: any) => (
								<div className="flex w-full justify-center border-b last:border-b-0 mt-3" key={item?.room_type}>

									<div className="nc-StayCard2 grid grid-cols-1 sm:grid-cols-3 gap-5 group relative w-full dark:border-neutral-800 pb-3">
										{getImageUrlsBySpaceType(item?.space_type).length > 0 &&

											<div className="relative w-full" >
												<GallerySlider3
													uniqueID="StayCard2_sampleID"
													ratioClass="aspect-w-6 aspect-h-4"
													galleryImgs={getImageUrlsBySpaceType(item?.space_type)}
													galleryImgsMsg={getImageMessageBySpaceType(item?.space_type)}
													imageClass="rounded-lg"
													href="javascript:void(0)"
													onImageClick={() => setActiveModal(item?.space_type)}
												/>
												{/* <div className='mt-2' onClick={() => setActiveModal(item?.space_type)}>
													
													<Badge name={`${getImageUrlsBySpaceType(item?.space_type).length} Photos →`} color="red" className='cursor-pointer' />
												</div> */}
											</div>}

										<div className='col-span-2'>
											<div className="mt-3 space-y-3">

												<div className="flex items-start justify-between">
													<div>
														<p className="text-lg font-bold">
															{item?.room_type}
														</p>
														<div className="flex items-center justify-between space-x-5 mt-3 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start">

															<div className="text-center">
																<img className='h-6' src="/user.png" alt="userimage" />
																<p>x {item.accommodates}</p>
															</div>

															<div className="text-center">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 24 24"
																	width={24}
																	height={24}
																	color={'currentColor'}
																	fill={'none'}
																	className="h-6 w-6"
																>
																	<path
																		d="M22 17.5H2"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																	<path
																		d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																</svg>
																<p>x {item?.beds}</p>
															</div>
															<div className="text-center">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 24 24"
																	width={24}
																	height={24}
																	color={'currentColor'}
																	fill={'none'}
																	className="h-6 w-6"
																>
																	<path
																		d="M6 20L5 21M18 20L19 21"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																	<path
																		d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M2 12H22"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																	<path
																		d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																	<path
																		d="M8 6L10.5 4"
																		stroke="currentColor"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																</svg>
																<p>x 1</p>
															</div>
															</div>
													</div>
													<div className="flex items-start flex-col">
														<p className="text-base font-semibold">
															₹{item?.room_price} <span className="text-sm text-neutral-500 dark:text-neutral-400">/1 nights</span>
														</p>



														<form>
													
															<select
															id="rooms"
															className="bg-gray-50 w-full min-w-[9rem] my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															onChange={(e) => {
																const selectedValue = parseInt(e.target.value);
																const roomKey = item?.space_type;
																
														
																let updatedRooms = [...selectedRooms].filter(r => r.space_type !== roomKey);

																if (selectedValue > 0) {
																const newRoom = {
																	type: item?.room_type,
																	count: selectedValue,
																	accommodates: item?.accommodates,
																	guest_fee: item?.guest_fee,
																	room_price: item?.room_price,
																	room_id: item?.id,
																	space_type: item?.space_type,
																	guest_after: item?.guest_after,																
																	weekly_discount: item?.weekly_discount,
																	security_fee: item?.security_fee,
																	cleaning_fee: item?.cleaning_fee,
																	weekend_price: item?.weekend_price,
																	fortnight_discount: item?.fortnight_discount,
																	monthly_discount: item?.monthly_discount,
																	total_rooms: item?.total_rooms,
																	total_accommodates: item?.total_accommodates,
																};
																updatedRooms.push(newRoom);
																}

																setSelectedRooms(updatedRooms);
																console.log(updatedRooms, "updatedRooms");

																const total = updatedRooms.reduce((acc, room) => acc + room.room_price * room.count, 0);
																setRoomPrice(total);

																localStorage.setItem("selectedRooms", JSON.stringify(updatedRooms));

																let updatedGuestFee = 0;
																if (total === 1) {
																const singleRoom = updatedRooms.find(r => r.count === 1);
																updatedGuestFee = singleRoom?.guest_fee || 0;
																} else if (total > 1) {
																const guestFees = updatedRooms.flatMap(room => Array(room.count).fill(room.guest_fee));
																updatedGuestFee = Math.min(...guestFees);
																}

																setCurrentActiveRoom((prev: any) => ({
																...prev,
																rooms: updatedRooms,
																guest_fee: updatedGuestFee
																}));
															}}
															>
															<option value='0' selected={currentActiveRoom.type !== item?.room_type}>
																Select {item?.room_type}
															</option>
															{[...Array(item?.total_rooms)].map((_, index) => {
																const value = index + 1;
																return (
																<option key={value} value={value}>
																	{value} {item?.room_type}
																</option>
																);
															})}
															</select>

														</form>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* room modal image gallery  */}
									<CustomRoomModal
										key={item?.room_type}
										isOpen={activeModal === item?.space_type}
										closeModal={() => setActiveModal(null)}
										title={`${item?.room_type} Room`}
									>
										<GallerySlider3
											uniqueID="StayCard2_sampleID"
											ratioClass="aspect-w-6 aspect-h-4"
											galleryImgs={getImageUrlsBySpaceType(item?.space_type)}
											galleryImgsMsg={getImageMessageBySpaceType(item?.space_type)}
											imageClass="rounded-lg"
											href="javascript:void(0)"
										/>
									</CustomRoomModal>
								</div>
							))
						}
					
						{amenities?.Inclusive.length > 0 && (
						<>
							<div className="mr-t-5"> <span className="text-base font-semibold">Inclusive : </span>
							
								
							{amenities?.Inclusive.map((item: any) => {
									
								return(
								<span key={item.id}>
								<strong className="text-[1.5rem] text-gray-500 align-middle">&bull;</strong>
								<span>{item.title}</span>
								</span>)})}
							
							</div>
						</>)}
					</div>
				</>
			)
		}

		
	const { result, amenities, attractions, excursions, rooms } = listingDetail ?? {}; // Use nullish coalescing (??) to provide a fallback empty object
	const { description } = listingDescription ?? {};
	console.log(rooms, "rooms");
    //console.log("result",result)

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md mt-3">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 border dark:border-neutral-700"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover"
							src={result?.cover_photo}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{result?.property_photos?.filter((_: any, i: any) => i >= 1 && i < 5).map((item: any, index: any) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md border dark:border-neutral-700 ${index >= 3 ? 'hidden sm:block' : ''
								}`}
						>
							<div className="aspect-h-4 aspect-w-6">
								
								<Image
									fill
									className="rounded-md object-cover"
									src={item.image_url || ''}
									alt=""
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</button>
				</div>
				{/* Modal Overlay */}
				<div
					className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
					isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
				>
				{/* Modal Content */}
				<div
				className={`relative bg-white rounded-lg shadow-lg max-w-5xl w-full max-h-[120vh] overflow-y-auto p-4 transform transition-all duration-300 ${
					isModalOpen ? "scale-100" : "scale-95"
				}`}
				>
				{/* Close Button */}
				<button
					onClick={handleCloseModal}
					className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
				>
					<XMarkIcon className="w-6 h-6 text-gray-700" />
				</button>

				{/* Slider */}
				<CategoryImageSlider propertiesPhotos={propertiesPhotos} />
				</div>
			</div>
			</header>

			{/* MAIN */}
			<main className={`relative ${activeModal == null ? 'z-10' : 'z-40'} mt-11 flex flex-col lg:flex-row`}>
				{/* CONTENT */}
				<div className="w-full space-y-5 lg:w-3/5 xl:w-2/3 lg:space-y-5 lg:pr-10 overflow-y-auto h-full">
					{renderSection1({ result })}
					{rooms?.length > 0 && renderRoomSection({ rooms })}
					<SectionDateRange
						setRoomPrice={setRoomPrice}
						propertyDates={result?.property_dates}
						//  previousPrice={result?.property_price?.price}
						previousPrice={currentroomPrice}
						setDaysToStay={setDaysToStay}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate} />
					{/* {renderRoomSection1()} */}
					{renderSection2({ description })}
					{description?.about_place != null && renderSection9()}
					{renderSection3({ amenities })}
					{amenities?.SafetyAmenities.length > 0 && renderSafetyAmenities({ amenities })}
					{/* {allNewAmenities && renderInclusive({ allNewAmenities })} */}
					{/* {renderSection4()} */}
					{renderSection10()}
					{description?.guestsactivity?.length > 0 && renderSection11({ description })}
					{attractions?.length > 0 && renderSection12({ attractions })}
					{excursions?.length > 0 && renderSection13({ excursions })}
					{renderSection7({ result })}
					{renderSection5({ result })}
					{renderSection6()}
					{description?.interaction_guests && renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 flex-grow lg:mt-0 lg:block" id='sidebarr'>
					<div className="sticky top-32">{renderSidebar({ result })}</div>
				</div>

				{/* mobile sidebar  */}
				<div>
					{renderMobileSidebar()}
				</div>
			</main>
			
				  
		</div>
	)
}

export default ListingStayDetailPage
