'use client'

import React, { FC, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { GuestsObject } from '../(client-components)/type'
import { useImages } from '../contextApi/ImageContext'

import ModalSelectDate from '@/components/ModalSelectDate'
import ModalSelectGuests from '@/components/ModalSelectGuests'
import StartRating from '@/components/StartRating'
import Label from '@/components/Label'
import ButtonPrimary from '@/shared/ButtonPrimary'
import NcModal from '@/shared/NcModal'

import converSelectedDateToString from '@/utils/converSelectedDateToString'




export interface CheckOutPagePageMainProps {
  className?: string
  startDate?: Date | null
  endDate?: Date | null
  guestAdultsInputValue?: number
  guestChildrenInputValue?: number
  guestInfantsInputValue?: number
  currentroomPrice?: number
  numberOfRoomSelected?: number
  daysToStay?: number
  workationDiscount?: number
  surgedPrice?: number
  extraGuest?: number
  currentActiveRoom?: {
    guest_fee: number
  }
  convenienceFee?: number
  gst?: number
  roomPrice?: number
  totalPrice?: number
  result?: any
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = '',
  startDate,
  endDate,
  guestAdultsInputValue = 0,
  guestChildrenInputValue = 0,
  guestInfantsInputValue = 0,
  currentroomPrice = 0,
  numberOfRoomSelected = 0,
  daysToStay = 1,
  workationDiscount = 0,
  surgedPrice = 0,
  extraGuest = 0,
  currentActiveRoom = { guest_fee: 0 },
  convenienceFee = 0,
  gst = 0,
  roomPrice = 0,
  totalPrice = 0,
  result = {},
}) => {
  const [starttDate, setStartDate] = useState<Date | null>(startDate || null)
  const [enddDate, setEndDate] = useState<Date | null>(endDate || null)
  const router = useRouter();
  const { loggedUser } = useImages()

  const [guests, setGuests] = useState<{
    guestAdults: number;
    guestChildren: number;
    guestInfants: number;
  }>({
    guestAdults: guestAdultsInputValue,
    guestChildren: guestChildrenInputValue,
    guestInfants: guestInfantsInputValue,
  });
  

  const totleguests = guestAdultsInputValue + guestChildrenInputValue + guestInfantsInputValue

  const roomsid = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('selectedRoom') || 'null') : null
 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
    checkin: startDate,
    checkout: endDate,
    booking_type: result?.booking_type,
    user_id: loggedUser?.id,
    property_id: result?.property_type?.id,
    currency_code: 'INR',
    booking_status: 'Pending',
    per_night_price: result?.min_room_price,
    total_night: daysToStay,
    convenience_fees: convenienceFee,
    gst: gst,
    total: totalPrice,
    rooms_id: roomsid ? [{ room_id: roomsid.room_id }] : [],
    number_of_guests: totleguests,
    room_price: result?.room_price,
    space_type: currentActiveRoom,
    totalrooms: roomsid?.count || 0,
  })

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

  const renderSidebar = () => (
    <div className="flex w-full flex-col space-y-6 border-neutral-200 px-0 dark:border-neutral-700 sm:space-y-8 sm:rounded-2xl sm:p-6 lg:border xl:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="w-full flex-shrink-0 sm:w-40">
          <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-2xl sm:aspect-h-4">
            <Image alt="" fill sizes="200px" src={result?.cover_photo} />
          </div>
        </div>
        <div className="space-y-3 py-5 sm:px-5">
          <div>
            <span className="mt-1 block text-base font-medium">{result?.name}</span>
          </div>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400">
            {result?.bedrooms} beds · {result?.bathrooms} baths
          </span>
          <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
          <StartRating point={result?.overall_rating} reviewCount={result?.reviews_count} />
        </div>
      </div>
      <div className="z-10 mt-6 flex flex-col divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:divide-x sm:divide-y-0">
        <ModalSelectDate
          renderChildren={({ openModal }) => (
            <button
              onClick={openModal}
              className="flex flex-1 border-b justify-between space-x-5 px-5 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800"
              type="button"
            >
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">{converSelectedDateToString([starttDate, enddDate])}</span>
              </div>
            </button>
          )}
        />

        <ModalSelectGuests
          renderChildren={({ openModal }) => (
            <button
              type="button"
              onClick={openModal}
              className="flex flex-1 justify-between space-x-5 px-5 py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {`${guests.guestAdults || 0} Adult, ${guests.guestChildren || 0} Children, ${guests.guestInfants || 0} Infant`}
                </span>
              </div>
            </button>
          )}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
          <span>
            <div>
              ₹ {currentroomPrice}
              <span className="text-xs">/night</span> ({numberOfRoomSelected}{' '}
              <span className="text-xs">room</span> x {daysToStay.toFixed(0)}{' '}
              <span className="text-xs">day</span>)
            </div>
            {workationDiscount > 0 && (
              <div className="text-xs text-red-500">{`Discount: ${workationDiscount}%`}</div>
            )}
          </span>
          <span>
            <div>₹ {surgedPrice - extraGuest * (currentActiveRoom?.guest_fee || 0)}</div>
            {workationDiscount > 0 && (
              <span className="text-xs line-through">₹ {(roomPrice * daysToStay).toFixed(2)}</span>
            )}
          </span>
        </div>
        {extraGuest > 0 && (
          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span>
              Extra Guest ({extraGuest} x ₹{currentActiveRoom?.guest_fee})
            </span>
            <span>₹ {extraGuest * (currentActiveRoom?.guest_fee || 0)}</span>
          </div>
        )}
        <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
          <span>Convenience Fee ({convenienceFee}%)</span>
          <span>₹ {((convenienceFee / 100) * surgedPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
          <span>GST ({gst}%)</span>
          <span>
            ₹
            {(
              (surgedPrice + (convenienceFee / 100) * surgedPrice) *
              (gst / 100)
            ).toFixed(2)}
          </span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="flex">₹{totalPrice}</span>
        </div>
      </div>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const res = await axios.post(`https://homestay.kliffhost.in/api/payments/booking`, formData, {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY
        },
      }

      );
      console.log('Server response (Success):', res.data);
      if (res.data.message === 'email already exits') {
        toast.error('Email already exists. Please use a different email.');
        return;
      }
      toast.success('Reservation submitted successfully!');
      router.push('/pay-done');
    } catch (error: any) {
      console.error('Error (Failure):', error.response?.data?.message || error.message);
    }

  };


  return (
    <div className={`nc-CheckOutPagePageMain ${className}`} data-nc-id="CheckOutPagePageMain">
      <div className="container my-14 lg:my-20">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
          {/* Left Section: Form */}
          <div className="w-full max-w-2xl flex-grow rounded-3xl border border-neutral-200 bg-white p-10 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-10 text-3xl font-semibold">Your Booking Information</div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Label >First Name</Label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="input-bordered input w-full"
              />

              <Label >Last Name</Label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="input-bordered input w-full"
              />

              <Label >Email</Label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-bordered input w-full"
              />

              <Label>Phone</Label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-bordered input w-full"
              />
            </div>

            <div className="mt-6">
              <Label >Message (optional)</Label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="input-bordered input w-full resize-none"
                placeholder="Anything you want to tell us?"
              />
            </div>

            <div className="mt-10 flex justify-end">
              <ButtonPrimary type="submit">Confirm Booking</ButtonPrimary>
            </div>
          </div>

          {/* Right Section: Sidebar Summary */}
          <div className="w-full max-w-md">{renderSidebar()}</div>
        </form>
      </div>
    </div>
  )
}

export default CheckOutPagePageMain
