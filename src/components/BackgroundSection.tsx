import React, { FC } from 'react'

export interface BackgroundSectionProps {
	className?: string
	children?: React.ReactNode
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
	className = 'bg-neutral-100 dark:bg-black dark:bg-opacity-20 ',
	children,
}) => {
	return (
		<div
			className={`nc-BackgroundSection absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl ${className}`}
			data-nc-id="BackgroundSection"
		>
			{children}
		</div>
	)
}

export default BackgroundSection
