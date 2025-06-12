'use client';
import StartRating from '@/components/StartRating'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'; 
export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
	const searchParams = useSearchParams();

  const trx = searchParams.get('trx');
  const first_name = searchParams.get('first_name');
  const last_name = searchParams.get('last_name');
  const start_date = searchParams.get('start_date');
  const guest = searchParams.get('guest');
  const package_price = searchParams.get('package_price');
  const package_name = searchParams.get('package_name');

	const renderContent = () => {
		return (
			<div className="flex w-full flex-col space-y-10 px-0 sm:rounded-2xl sm:p-6 xl:p-8">
				<h2 className="text-3xl font-semibold lg:text-4xl">
					Congratulation 🎉
				</h2>

				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* ------------------------ */}
				<div className="space-y-6">
					<h3 className="text-2xl font-semibold">Your booking</h3>
					<div className="flex flex-col sm:flex-row sm:items-center">
						<div className="w-full flex-shrink-0 sm:w-40">
							<div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-2xl sm:aspect-h-4">
								<Image
									fill
									alt=""
									className="object-cover"
									src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
								/>
							</div>
						</div>
						<div className="space-y-3 pt-5 sm:px-5 sm:pb-5">
							<div>
								<span className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
									
								</span>
								<span className="mt-1 block text-base font-medium sm:text-lg">
									{package_name}
								</span>
							</div>
							<span className="block text-sm text-neutral-500 dark:text-neutral-400">
								2 beds · 2 baths
							</span>
							<div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
							<StartRating />
						</div>
					</div>
					<div className="mt-6 flex flex-col divide-y divide-neutral-200 rounded-3xl border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
						<div className="flex flex-1 space-x-4 p-5">
							<svg
								className="h-8 w-8 text-neutral-300 dark:text-neutral-600"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
									stroke="#D1D5DB"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<div className="flex flex-col">
								<span className="text-sm text-neutral-400">Date</span>
								<span className="mt-1.5 text-lg font-semibold">
									{start_date}
								</span>
							</div>
						</div>
						<div className="flex flex-1 space-x-4 p-5">
							<svg
								className="h-8 w-8 text-neutral-300 dark:text-neutral-600"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
									stroke="#D1D5DB"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<div className="flex flex-col">
								<span className="text-sm text-neutral-400">Guests</span>
								<span className="mt-1.5 text-lg font-semibold">{guest}</span>
							</div>
						</div>
					</div>
				</div>

				{/* ------------------------ */}
				<div className="space-y-6">
					<h3 className="text-2xl font-semibold">Booking detail</h3>
					<div className="flex flex-col space-y-4">
						<div className="flex text-neutral-600 dark:text-neutral-300">
							<span className="flex-1">Booking code</span>
							<span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
								{trx}
							</span>
						</div>
						<div className="flex text-neutral-600 dark:text-neutral-300">
							<span className="flex-1">Name</span>
							<span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
								{first_name}{last_name}
							</span>
						</div>
						
						<div className="flex text-neutral-600 dark:text-neutral-300">
							<span className="flex-1">Date</span>
							<span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
								{start_date}
							</span>
						</div>
						<div className="flex text-neutral-600 dark:text-neutral-300">
							<span className="flex-1">Total</span>
							<span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
								{package_price}
							</span>
						</div>
						{/* <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
							<span className="flex-1">Payment method</span>
							<span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
								Credit card
							</span>
						</div> */}
					</div>
				</div>
				<div>
					<ButtonPrimary href="/">Explore more stays</ButtonPrimary>
				</div>
			</div>
		)
	}

	return (
		<div className={`nc-PayPage`}>
			<main className="container mb-24 mt-11 lg:mb-32">
				<div className="mx-auto max-w-4xl">{renderContent()}</div>
			</main>
		</div>
	)
}

export default PayPage
