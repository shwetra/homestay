import React, { FC } from 'react'
import ButtonCircle from '@/shared/ButtonCircle'
import rightImg from '@/images/SVG-subcribe2.png'
import Badge from '@/shared/Badge'
import Input from '@/shared/Input'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export interface SectionSubscribe2Props {
	className?: string
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
	return (
		<div
			className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
			data-nc-id="SectionSubscribe2"
		>
			<div className="mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				<h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
				<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
					Read and share new perspectives on just about any topic. Everyone’s
					welcome.
				</span>
				<ul className="mt-10 space-y-4">
					<li className="flex items-center space-x-4">
						<Badge name="01" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get more discount
						</span>
					</li>
					<li className="flex items-center space-x-4">
						<Badge color="red" name="02" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get premium magazines
						</span>
					</li>
				</ul>
				<form className="relative mt-10 max-w-sm">
					<Input
						required
						aria-required
						placeholder="Enter your email"
						type="email"
						rounded="rounded-full"
						sizeClass="h-12 px-5 py-3"
					/>
					<ButtonCircle
						type="submit"
						className="absolute right-1.5 top-1/2 -translate-y-1/2 transform"
						size="w-10 h-10"
					>
						<ArrowRightIcon className="h-5 w-5" />
					</ButtonCircle>
				</form>
			</div>
			<div className="flex-grow">
				<Image alt="" src={rightImg} />
			</div>
		</div>
	)
}

export default SectionSubscribe2
