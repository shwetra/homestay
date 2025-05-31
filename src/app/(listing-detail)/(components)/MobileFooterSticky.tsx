import React, { useState } from 'react'
import ModalSelectDate from '@/components/ModalSelectDate'
import ButtonPrimary from '@/shared/ButtonPrimary'
import converSelectedDateToString from '@/utils/converSelectedDateToString'
import ModalReserveMobile from './ModalReserveMobile'

const MobileFooterSticky = () => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/02/06'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/02/23'))

	return (
		// <div className="fixed inset-x-0 bottom-0 z-40 block border-t border-neutral-200 bg-white py-2 dark:border-neutral-600 dark:bg-neutral-800 sm:py-3 lg:hidden">
		// 	<div className="container flex items-center justify-between">
		// 		<div className="">
		// 			<span className="block text-xl font-semibold">
		// 				$311
		// 				<span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
		// 					/night
		// 				</span>
		// 			</span>
		// 			<ModalSelectDate
		// 				renderChildren={({ openModal }) => (
		// 					<span
		// 						onClick={openModal}
		// 						className="block text-sm font-medium underline"
		// 					>
		// 						{converSelectedDateToString([startDate, endDate])}
		// 					</span>
		// 				)}
		// 			/>
		// 		</div>
		// 		<ModalReserveMobile
		// 			renderChildren={({ openModal }) => (
		// 				<ButtonPrimary
		// 					sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
		// 					onClick={openModal}
		// 				>
		// 					Reserve
		// 				</ButtonPrimary>
		// 			)}
		// 		/>
		// 	</div>
		// </div>
		<div></div>
	)
}

export default MobileFooterSticky
