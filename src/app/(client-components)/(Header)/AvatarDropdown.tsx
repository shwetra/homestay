'use client'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Avatar from '@/shared/Avatar'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import Link from 'next/link'
import { useImages } from '@/app/contextApi/ImageContext'
import axios from 'axios'
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify'
import { FaRegCircleUser } from "react-icons/fa6";

interface Props {
	className?: string
}

export default function AvatarDropdown({ className = '' }: Props) {

	const {token, setToken, loggedUser, setLoggedUser} = useImages()

	const fetchLoggedUser = async () => {
		try {
		  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
			headers: {
			  "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
			  'Authorization': `Bearer ${token}`,
			},
		  });
	
		  if (data.status === 'success') {
			setLoggedUser(data?.data)
		  }
		} catch (error) {
		  console.error(error);
		}
		
	}
	
	const handleLogout = () => {
		toast.success("Logout successful")
		localStorage.removeItem('loginToken');
		setToken(null);
	}

	useEffect(()=>{
		fetchLoggedUser()
	},[token])

console.log(loggedUser);
	return (
		<>
			<Popover className={`AvatarDropdown relative flex ${className}`}>
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex px-4 py-1 ms-2 items-center justify-center self-center rounded-full text-white border-2 border-white hover:text-gray-700 hover:bg-slate-100 focus:outline-none dark:border-neutral-700 dark:text-slate-300 dark:hover:bg-slate-800`}
						>
							{/* <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" /> */}
							{
								token !== null ? (
									<div className='flex gap-1 items-center'>
										<FaRegCircleUser />
										<p>{loggedUser?.first_name}</p>
										
									</div>
								) : ('Login')
							}
							
						</PopoverButton>
							
					

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -right-10 top-full z-10 w-screen max-w-[260px] px-4 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
										{/* <div className="flex items-center space-x-3">
											<Avatar sizeClass="w-12 h-12" />

											<div className="flex-grow">
												<h4 className="font-semibold">Eden Smith</h4>
												<p className="mt-0.5 text-xs">Los Angeles, CA</p>
											</div>
										</div> */}

										{/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700" /> */}

										{/* ------------------ 1 --------------------- */}
										{/* <Link
											href={'/account'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'My Account'}</p>
											</div>
										</Link> */}

										{/* ------------------ 2 --------------------- */}
										{/* <Link
											href={'/author'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M8 12.2H15"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M8 16.2H12.38"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'My bookings'}</p>
											</div>
										</Link> */}

										{/* ------------------ 2 --------------------- */}
										{/* <Link
											href={'/account-savelists'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Wishlist'}</p>
											</div>
										</Link>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" /> */}

										{/* ------------------ 2 --------------------- */}
										<div className="-m-3 flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
											<div className="flex items-center">
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium">{'Dark theme'}</p>
												</div>
											</div>
											<SwitchDarkMode2 />
										</div>

										{/* ------------------ 2 --------------------- */}
										{
											token !== null &&
											<div
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
											<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											</div>
											<div className="ml-4">
												{
													<>
														<p className="text-sm font-medium">{loggedUser?.first_name} {loggedUser?.last_name}</p>
														<p className="text-xs font-medium text-gray-400">{loggedUser?.email}</p>
													</>
												}
												
												
											</div>
										</div>
										}

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/login'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												{
													token === null ?
													(<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>)
													:(<MdLogout className='w-5 h-5 ms-1' />)
												}
												
											</div>
											<div className="ml-4">
												{
													token === null ?
													(
													<p className="text-sm font-medium">{'Guest Login'}</p>
												)
													: (<p className="text-sm text-red-500 font-medium" onClick={handleLogout}>{'Logout'}</p>)
												}
												
												
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										{ token === null && <Link
											href={'/login'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												{
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												}
											</div>
											<div className="ml-4">
													<p className="text-sm font-medium">{'Host Login'}</p>
											</div>
										</Link>}
										
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}
