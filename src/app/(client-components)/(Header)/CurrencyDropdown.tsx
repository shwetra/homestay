'use client'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import {
	CurrencyDollarIcon,
	CurrencyBangladeshiIcon,
	CurrencyEuroIcon,
	CurrencyPoundIcon,
	CurrencyRupeeIcon,
	BanknotesIcon,
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'

export const headerCurrency = [
	{
		id: 'EUR',
		name: 'EUR',
		href: '##',
		icon: CurrencyEuroIcon,
		active: true,
	},
	{
		id: 'USD',
		name: 'USD',
		href: '##',
		icon: CurrencyDollarIcon,
	},
	{
		id: 'GBF',
		name: 'GBF',
		href: '##',
		icon: CurrencyBangladeshiIcon,
	},
	{
		id: 'SAR',
		name: 'SAR',
		href: '##',
		icon: CurrencyPoundIcon,
	},
	{
		id: 'QAR',
		name: 'QAR',
		href: '##',
		icon: CurrencyRupeeIcon,
	},
]

export default function CurrencyDropdown() {
	return (
		<div className="CurrencyDropdown">
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={` ${open ? '' : 'text-opacity-80'} group inline-flex items-center rounded-full border-neutral-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300`}
						>
							<BanknotesIcon className="h-5 w-5 opacity-80" />
							<span className="ml-2 select-none">Currency</span>
							<ChevronDownIcon
								className={`${open ? '-rotate-180' : 'text-opacity-70'} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
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
							<PopoverPanel className="absolute right-0 z-10 mt-4 w-screen max-w-[140px] px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-7 bg-white p-7 dark:bg-neutral-800">
										{headerCurrency.map((item, index) => (
											<a
												key={index}
												href={item.href}
												onClick={() => close()}
												className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700 ${
													item.active
														? 'bg-gray-100 dark:bg-neutral-700'
														: 'opacity-80'
												}`}
											>
												<item.icon className="h-[18px] w-[18px]" />
												<p className="ml-2 text-sm font-medium">{item.name}</p>
											</a>
										))}
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}
