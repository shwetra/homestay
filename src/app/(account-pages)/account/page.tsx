import React, { FC } from 'react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Textarea from '@/shared/Textarea'

export interface AccountPageProps {}

const AccountPage = () => {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">Account infomation</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-shrink-0 items-start">
					<div className="relative flex overflow-hidden rounded-full">
						<Avatar sizeClass="w-32 h-32" />
						<div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
									stroke="currentColor"
									strokeWidth={1.5}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<span className="mt-1 text-xs">Change Image</span>
						</div>
						<input
							type="file"
							className="absolute inset-0 cursor-pointer opacity-0"
						/>
					</div>
				</div>
				<div className="mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:pl-16">
					<div>
						<Label>Name</Label>
						<Input className="mt-1.5" />
					</div>
					{/* ---- */}
					<div>
						<Label>Gender</Label>
						<Select className="mt-1.5">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</Select>
					</div>
					{/* ---- */}
					<div>
						<Label>Username</Label>
						<Input className="mt-1.5" />
					</div>
					{/* ---- */}
					<div>
						<Label>Email</Label>
						<Input className="mt-1.5" />
					</div>
					{/* ---- */}
					<div className="max-w-lg">
						<Label>Date of birth</Label>
						<Input className="mt-1.5" type="date"  />
					</div>
					{/* ---- */}
					<div>
						<Label>Addess</Label>
						<Input className="mt-1.5"  />
					</div>
					{/* ---- */}
					<div>
						<Label>Phone number</Label>
						<Input className="mt-1.5"  />
					</div>
					{/* ---- */}
					<div>
						<Label>About you</Label>
						<Textarea className="mt-1.5"  />
					</div>
					<div className="pt-2">
						<ButtonPrimary>Update info</ButtonPrimary>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountPage
