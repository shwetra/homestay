'use client'

import React from 'react'
import ButtonClose from '@/shared/ButtonClose'
import Logo from '@/shared/Logo'
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { NAVIGATION_DEMO } from '@/data/navigation'
import ButtonPrimary from '@/shared/ButtonPrimary'
import SocialsList from '@/shared/SocialsList'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import Link from 'next/link'
import LangDropdown from '@/app/(client-components)/(Header)/LangDropdown'

export interface NavMobileProps {
	data?: NavItemType[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	data = NAVIGATION_DEMO,
	onClickClose,
}) => {
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pb-1 pl-6 text-base">
				{item.children?.map((i, index) => (
					<Disclosure key={i.href + index} as="li">
						<Link
							href={{
								pathname: i.href || undefined,
							}}
							className="mt-0.5 flex rounded-lg px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
						>
							<span
								className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
							>
								{i.name}
							</span>
							{i.children && (
								<span
									className="flex flex-1"
									onClick={(e) => e.preventDefault()}
								>
									<DisclosureButton
										as="span"
										className="flex flex-1 justify-end py-2.5"
									>
										<ChevronDownIcon
											className="ml-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</DisclosureButton>
								</span>
							)}
						</Link>
						{i.children && (
							<DisclosurePanel>{_renderMenuChild(i)}</DisclosurePanel>
						)}
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={item.id}
				as="li"
				className="text-neutral-900 dark:text-white"
			>
				<Link
					className="flex w-full rounded-lg px-4 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.href || undefined,
					}}
				>
					<span
						className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
					>
						{item.name}
					</span>
					{item.children && (
						<span className="flex flex-1" onClick={(e) => e.preventDefault()}>
							<DisclosureButton
								as="span"
								className="flex flex-1 items-center justify-end py-2.5"
							>
								<ChevronDownIcon
									className="ml-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</DisclosureButton>
						</span>
					)}
				</Link>
				{item.children && (
					<DisclosurePanel>{_renderMenuChild(item)}</DisclosurePanel>
				)}
			</Disclosure>
		)
	}

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
			<div className="px-5 py-6">
				<Logo />
				<div className="mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300">
					<span>
						Discover the most outstanding articles on all topics of life. Write
						your stories and share them
					</span>

					<div className="mt-4 flex items-center justify-between">
						{/* <SocialsList /> */}
						<a href="/add-listing/1" className='bg-gray-700 px-4 py-2 rounded-full text-white'>List my homestay</a>
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6">
				{data.map(_renderItem)}
			</ul>
			{/* <div className="flex items-center justify-between px-5 py-6">
				<a
					className="inline-block"
					href="https://themeforest.net/item/chisfis-online-booking-nextjs-template/43399526"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ButtonPrimary>Get Template</ButtonPrimary>
				</a>

				<LangDropdown
					className="flex"
					panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 right-3 bottom-full sm:px-0"
				/>
			</div> */}
		</div>
	)
}

export default NavMobile
