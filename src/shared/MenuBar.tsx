import { useState, Fragment, useEffect, FC } from 'react'
import {
	Transition,
	Dialog,
	TransitionChild,
	DialogPanel,
} from '@headlessui/react'
import NavMobile from './Navigation/NavMobile'
import { usePathname } from 'next/navigation'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'

export interface MenuBarProps {
	className?: string
	iconClassName?: string
}
const MenuBar: FC<MenuBarProps> = ({
	className = 'p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 lg:hidden',
	iconClassName = 'h-7 w-7',
}) => {
	const [isVisable, setIsVisable] = useState(false)

	const pathname = usePathname()

	useEffect(() => {
		setIsVisable(false)
	}, [pathname])

	const handleOpenMenu = () => setIsVisable(true)
	const handleCloseMenu = () => setIsVisable(false)

	const renderContent = () => {
		return (
			<Transition appear show={isVisable} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 overflow-hidden"
					onClose={handleCloseMenu}
				>
					<TransitionChild
						as={Fragment}
						enter=" duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave=" duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/60 dark:bg-black/70" />
					</TransitionChild>
					<div className="fixed inset-0">
						<div className="flex min-h-full justify-end">
							<TransitionChild
								as={Fragment}
								enter="transition duration-100 transform"
								enterFrom="opacity-0 translate-x-56"
								enterTo="opacity-100 translate-x-0"
								leave="transition duration-150 transform"
								leaveFrom="opacity-100 translate-x-0"
								leaveTo="opacity-0 translate-x-56"
							>
								<DialogPanel className="w-full max-w-md transform overflow-hidden transition-all">
									<NavMobile onClickClose={handleCloseMenu} />
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		)
	}

	return (
		<>
			<button
				// onClick={handleOpenMenu}
				className={`flex items-center justify-center focus:outline-none ${className}`}
			>
				<Bars3BottomRightIcon className={iconClassName} />
			</button>

			{renderContent()}
		</>
	)
}

export default MenuBar
