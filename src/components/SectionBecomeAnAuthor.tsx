import React, { FC } from 'react'
import rightImgDemo from '@/images/BecomeAnAuthorImg.png'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Logo from '@/shared/Logo'
import Image from 'next/image'

export interface SectionBecomeAnAuthorProps {
	className?: string
	rightImg?: string
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
	className = '',
	rightImg = rightImgDemo,
}) => {
	return (
		<div
			className={`nc-SectionBecomeAnAuthor relative flex flex-col items-center lg:flex-row ${className}`}
			data-nc-id="SectionBecomeAnAuthor"
		>
			<div className="mb-16 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				<Logo className="w-20" />
				<h2 className="mt-6 text-3xl font-semibold sm:mt-11 sm:text-4xl">
					Why to choose us?
				</h2>
				<span className="mt-6 block text-neutral-500 dark:text-neutral-400">
					Homestays of India is dedicated to support authentic family run homestays across India. We aim to provide travelers a unique culturally immersive experience and the locals on alternate source of income while preserving their heritage, culture and tradition.
				</span>
				<ButtonPrimary className="mt-6 sm:mt-11">
					Become an author
				</ButtonPrimary>
			</div>
			<div className="flex-grow">
				<Image alt="" src={rightImg} />
			</div>
		</div>
	)
}

export default SectionBecomeAnAuthor
