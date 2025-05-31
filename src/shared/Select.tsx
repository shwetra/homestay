import React, { FC, SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string
	sizeClass?: string
}

const Select: FC<SelectProps> = ({
	className = '',
	sizeClass = 'h-11',
	children,
	...args
}) => {
	return (
		<select
			className={`nc-Select ${sizeClass} ${className} dark:focus:ring-primary-600 block w-full rounded-2xl border-neutral-200 bg-white text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-opacity-25`}
			{...args}
		>
			{children}
		</select>
	)
}

export default Select
