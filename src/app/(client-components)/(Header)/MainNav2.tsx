import React, { FC } from 'react'
import Logo from '@/shared/Logo'
import MenuBar from '@/shared/MenuBar'
import LangDropdown from './LangDropdown'
import NotifyDropdown from './NotifyDropdown'
import AvatarDropdown from './AvatarDropdown'
import DropdownTravelers from './DropdownTravelers'
import HeroSearchForm2MobileFactory from '../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import Link from 'next/link'
import TemplatesDropdown from './TemplatesDropdown'
import { Route } from '@/routers/types'

export interface MainNav2Props {
	className?: string
}

const MainNav2: FC<MainNav2Props> = ({ className = '' }) => {
	return (
		<div className={`MainNav2 relative z-10 ${className}`}>
			<div className="flex h-20 justify-between px-4 lg:container">
				<div className="hidden flex-1 justify-start space-x-3 sm:space-x-8 md:flex lg:space-x-10">
					<Logo className="w-24 self-center" />
					<div className="hidden h-7 self-center border-l border-neutral-300 dark:border-neutral-600 lg:block"></div>
					<div className="hidden lg:flex">
						<DropdownTravelers />
					</div>
				</div>

				<div className="!mx-auto max-w-lg flex-[3] self-center md:px-3 lg:hidden">
					<HeroSearchForm2MobileFactory />
				</div>

				<div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden space-x-1 lg:flex">
						<TemplatesDropdown />
						<LangDropdown />
						<Link
							href={'/add-listing' as Route<string>}
							className="group inline-flex items-center self-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 text-opacity-90 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300"
						>
							List my homestay
						</Link>

						<NotifyDropdown />
						<AvatarDropdown />
					</div>
					<div className="flex space-x-2 lg:hidden">
						<NotifyDropdown />
						<AvatarDropdown />
						<MenuBar />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav2
