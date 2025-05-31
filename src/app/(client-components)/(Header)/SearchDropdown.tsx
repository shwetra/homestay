'use client'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import Input from '@/shared/Input'
import React, { FC, Fragment } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Props {
	className?: string
}

const SearchDropdown: FC<Props> = ({ className = '' }) => {
	const inputRef = React.createRef<HTMLInputElement>()

	return (
		<React.Fragment>
			<Popover className={`relative ${className}`}>
				{({ open }) => {
					if (open) {
						setTimeout(() => {
							inputRef.current?.focus()
						}, 100)
					}

					return (
						<>
							<PopoverButton className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-[28px]">
								<MagnifyingGlassIcon className="h-6 w-6" />
							</PopoverButton>

							<Transition
								show={open}
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<PopoverPanel
									static
									className="absolute right-0 top-full z-10 w-screen max-w-sm"
								>
									<form action="" method="POST">
										<Input
											ref={inputRef}
											rounded="rounded-full"
											type="search"
											placeholder="Type and press enter"
										/>
										<input type="submit" hidden value="" />
									</form>
								</PopoverPanel>
							</Transition>
						</>
					)
				}}
			</Popover>
		</React.Fragment>
	)
}

export default SearchDropdown
