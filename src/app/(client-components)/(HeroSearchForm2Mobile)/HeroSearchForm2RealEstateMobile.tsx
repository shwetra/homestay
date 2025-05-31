'use client'

import {
	Dialog,
	DialogPanel,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useState } from 'react'
import ButtonSubmit from './ButtonSubmit'
import { useTimeoutFn } from 'react-use'
import RealestateSearchForm from './(real-estate-search-form)/RealestateSearchForm'

const HeroSearchForm2RealEstateMobile = () => {
	const [showModal, setShowModal] = useState(false)

	// FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
	const [showDialog, setShowDialog] = useState(false)
	let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1)
	//
	function closeModal() {
		setShowModal(false)
	}

	function openModal() {
		setShowModal(true)
	}

	const renderButtonOpenModal = () => {
		return (
			<button
				onClick={openModal}
				className="relative flex w-full items-center rounded-full border border-neutral-200 px-4 py-2 pr-11 shadow-lg dark:border-neutral-600"
			>
				<MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" />

				<div className="ml-3 flex-1 overflow-hidden text-left">
					<span className="block text-sm font-medium">Where to?</span>
					<span className="mt-0.5 block text-xs font-light text-neutral-500 dark:text-neutral-400">
						<span className="line-clamp-1">
							Anywhere • Any week • Add guests
						</span>
					</span>
				</div>

				<span className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-600 dark:text-neutral-300">
					<svg
						viewBox="0 0 16 16"
						aria-hidden="true"
						role="presentation"
						focusable="false"
						className="block h-4 w-4"
						fill="currentColor"
					>
						<path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
					</svg>
				</span>
			</button>
		)
	}

	return (
		<div className="HeroSearchForm2RealEstateMobile">
			{renderButtonOpenModal()}
			<Transition appear show={showModal} as={Fragment}>
				<Dialog
					as="div"
					className="HeroSearchFormMobile__Dialog z-max relative"
					onClose={closeModal}
				>
					<div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
						<div className="flex h-full">
							<TransitionChild
								as={Fragment}
								enter="ease-out transition-transform"
								enterFrom="opacity-0 translate-y-52"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in transition-transform"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-52"
							>
								<DialogPanel className="relative flex h-full flex-1 flex-col justify-between overflow-hidden">
									{showDialog && (
										<TabGroup
											manual
											className="relative flex h-full flex-1 flex-col justify-between"
										>
											<div className="absolute left-4 top-4">
												<button className="" onClick={closeModal}>
													<XMarkIcon className="h-5 w-5 text-black dark:text-white" />
												</button>
											</div>

											<TabList className="flex w-full justify-center space-x-6 pt-12 text-sm font-semibold text-neutral-500 dark:text-neutral-400 sm:space-x-8 sm:text-base">
												{['Buy', 'Rent', 'Sold'].map((item, index) => (
													<Tab key={index} as={Fragment}>
														{({ selected }) => (
															<div className="relative select-none outline-none focus:outline-none focus-visible:ring-0">
																<div
																	className={`${
																		selected ? 'text-black dark:text-white' : ''
																	} `}
																>
																	{item}
																</div>
																{selected && (
																	<span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
																)}
															</div>
														)}
													</Tab>
												))}
											</TabList>
											<div className="flex flex-1 overflow-hidden px-1.5 pt-3 sm:px-4">
												<TabPanels className="hiddenScrollbar flex-1 overflow-y-auto py-4">
													<TabPanel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<RealestateSearchForm />
														</div>
													</TabPanel>
													<TabPanel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<RealestateSearchForm />
														</div>
													</TabPanel>
													<TabPanel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<RealestateSearchForm />
														</div>
													</TabPanel>
												</TabPanels>
											</div>
											<div className="flex justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
												<button
													type="button"
													className="flex-shrink-0 font-semibold underline"
													onClick={() => {
														setShowDialog(false)
														resetIsShowingDialog()
													}}
												>
													Clear all
												</button>
												<ButtonSubmit
													onClick={() => {
														closeModal()
													}}
												/>
											</div>
										</TabGroup>
									)}
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default HeroSearchForm2RealEstateMobile
