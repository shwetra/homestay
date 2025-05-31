'use client'
import React, { Fragment, FC } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import Checkbox from '@/shared/Checkbox'
import { ClassOfProperties } from '../../type'
import { HomeIcon } from '@heroicons/react/24/outline'

const defaultPropertyType: ClassOfProperties[] = [
	{
		name: 'Duplex House',
		description: 'Have a place to yourself',
		checked: true,
	},
	{
		name: 'Ferme House',
		description: 'Have your own room and share some common spaces',
		checked: false,
	},
	{
		name: 'Chalet House',
		description:
			'Have a private or shared room in a boutique hotel, hostel, and more',
		checked: false,
	},
	{
		name: 'Maison House',
		description: 'Stay in a shared space, like a common room',
		checked: false,
	},
]

export interface PropertyTypeSelectProps {
	onChange?: (data: any) => void
	fieldClassName?: string
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
	onChange,
	fieldClassName = '[ nc-hero-field-padding ]',
}) => {
	const [typeOfProperty, setTypeOfProperty] =
		React.useState<ClassOfProperties[]>(defaultPropertyType)

	let typeOfPropertyText = ''
	if (typeOfProperty && typeOfProperty.length > 0) {
		typeOfPropertyText = typeOfProperty
			.filter((item) => item.checked)
			.map((item) => {
				return item.name
			})
			.join(', ')
	}
	return (
		<Popover className="relative flex flex-1">
			{({ open, close }) => (
				<>
					<PopoverButton
						className={`z-10 flex w-full flex-shrink-0 items-center text-left ${fieldClassName} cursor-pointer space-x-3 focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
						onClickCapture={() => document.querySelector('html')?.click()}
					>
						<div className="text-neutral-300 dark:text-neutral-400">
							<HomeIcon className="h-5 w-5 lg:h-7 lg:w-7" />
						</div>
						<div className="flex-1">
							<span className="block overflow-hidden font-semibold xl:text-lg">
								<span className="line-clamp-1">
									{typeOfPropertyText || `Type`}
								</span>
							</span>
							<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
								Property type
							</span>
						</div>
					</PopoverButton>

					{open && (
						<div className="absolute -inset-x-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
					)}

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute left-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<div className="">
								<div className="relative flex flex-col space-y-5">
									{typeOfProperty.map((item, index) => (
										<div key={item.name} className="">
											<Checkbox
												name={item.name}
												label={item.name}
												subLabel={item.description}
												defaultChecked={typeOfProperty[index].checked}
												onChange={(e) => {
													const newState = typeOfProperty.map((item, i) => {
														if (i === index) {
															return { ...item, checked: e }
														}
														return item
													})
													setTypeOfProperty(() => {
														return newState
													})
													onChange && onChange(newState)
												}}
											/>
										</div>
									))}
								</div>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PropertyTypeSelect
