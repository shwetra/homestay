import React, { HTMLAttributes, ReactNode } from 'react'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string
	desc?: ReactNode
	isCenter?: boolean
}

const Heading: React.FC<HeadingProps> = ({
	children,
	desc = 'Discover the most outstanding blogs. ',
	className = 'mb-10 text-neutral-900 dark:text-neutral-50',
	isCenter = false,
	...args
}) => {
	return (
		<div className={`nc-Section-Heading relative ${className}`}>
			<div
				className={
					isCenter ? 'mx-auto mb-4 w-full max-w-2xl text-center' : 'max-w-2xl'
				}
			>
				<h2 className={`text-3xl font-semibold md:text-4xl`} {...args}>
					{children || `Section Heading`}
				</h2>
				{desc && (
					<span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
						{desc}
					</span>
				)}
			</div>
		</div>
	)
}

export default Heading
