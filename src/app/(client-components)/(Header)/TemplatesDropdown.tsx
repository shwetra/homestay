import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { NAVIGATION_DEMO_2 } from '@/data/navigation'
import { NavItemType } from '@/shared/Navigation/NavigationItem'
import Link from 'next/link'
import Collection from '@/components/Collection'

export default function TemplatesDropdown() {
	const renderMegaMenuNavlink = (
		item: NavItemType,
		index: number,
		close: () => void,
	) => {
		return (
			<li key={item.id} className={`${item.isNew ? 'menuIsNew' : ''}`}>
				<Link
					target={item.targetBlank ? '_blank' : undefined}
					rel="noopener noreferrer"
					className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
					href={{
						pathname: item.href || undefined,
					}}
					onClick={close}
				>
					{item.name}
				</Link>
			</li>
		)
	}

	return (
		<>
			<Popover className="TemplatesDropdown hidden self-center lg:block">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={` ${open ? '' : 'text-opacity-80'} group inline-flex h-10 items-center px-3 py-1.5 text-sm font-medium text-gray-800 hover:text-opacity-100 focus:outline-none dark:text-slate-300 sm:h-12`}
						>
							<span className="">Templates</span>
							<ChevronDownIcon
								className={`${open ? '-rotate-180' : ''} ml-1 h-4 w-4 transition duration-150 ease-in-out`}
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
							<PopoverPanel className="absolute inset-x-0 top-full z-20 w-full">
								<div className="bg-white shadow-lg dark:bg-neutral-900">
									<div className="container">
										<div className="flex border-t border-slate-200 py-14 text-sm dark:border-slate-700">
											<div className="grid flex-1 grid-cols-5 gap-6 pr-6 xl:gap-8 xl:pr-8">
												{NAVIGATION_DEMO_2.map((item, index) => (
													<div key={index}>
														<p className="font-medium text-slate-900 dark:text-neutral-200">
															{item.name}
														</p>
														<ul className="mt-4 grid space-y-4">
															{item.children?.map((item, index) =>
																renderMegaMenuNavlink(item, index, close),
															)}
														</ul>
													</div>
												))}
											</div>
											<div className="w-[35%] xl:w-[30%]">
												<Collection />
											</div>
										</div>
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
