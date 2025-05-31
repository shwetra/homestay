'use client'

import { FC, Fragment, ReactNode, useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import ButtonClose from '@/shared/ButtonClose'
import Button from '@/shared/Button'

export interface NcModalProps {
	renderContent: () => ReactNode
	renderTrigger?: (openModal: Function) => ReactNode
	contentExtraClass?: string
	contentPaddingClass?: string
	triggerText?: ReactNode
	modalTitle?: ReactNode
	isOpenProp?: boolean
	onCloseModal?: () => void
}

const NcModal: FC<NcModalProps> = ({
	renderTrigger,
	renderContent,
	contentExtraClass = 'max-w-screen-xl',
	contentPaddingClass = 'py-4 px-6 md:py-5',
	triggerText = 'Open Modal',
	modalTitle = 'Modal title',
	isOpenProp,
	onCloseModal,
}) => {
	let [isOpen, setIsOpen] = useState(!!isOpenProp)

	function closeModal() {
		if (typeof isOpenProp !== 'boolean') {
			setIsOpen(false)
		}
		onCloseModal && onCloseModal()
	}

	function openModal() {
		if (typeof isOpenProp !== 'boolean') {
			setIsOpen(true)
		}
	}

	useEffect(() => {
		setIsOpen(!!isOpenProp)
	}, [isOpenProp])

	return (
		<div className="nc-NcModal">
			{renderTrigger ? (
				renderTrigger(openModal)
			) : (
				<Button onClick={openModal}> {triggerText} </Button>
			)}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-1 text-center md:px-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
						</TransitionChild>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div
								className={`my-5 inline-block w-full transform overflow-hidden rounded-2xl border border-black border-opacity-5 bg-white text-left align-middle text-neutral-900 shadow-xl transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:my-8 ${contentExtraClass}`}
							>
								<div className="relative border-b border-neutral-100 px-6 py-4 text-center dark:border-neutral-700 md:py-5">
									<ButtonClose
										onClick={closeModal}
										className="absolute left-2 top-1/2 -translate-y-1/2 transform sm:left-4"
									/>
									{modalTitle && (
										<DialogTitle
											as="h3"
											className="mx-10 text-base font-semibold text-neutral-900 dark:text-neutral-200 lg:text-xl"
										>
											{modalTitle}
										</DialogTitle>
									)}
								</div>
								<div className={contentPaddingClass}>{renderContent()}</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default NcModal
