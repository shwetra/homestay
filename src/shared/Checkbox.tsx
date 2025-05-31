'use client'

import React, { FC } from 'react'

export interface CheckboxProps {
	label?: string
	subLabel?: string
	className?: string
	name: string
	defaultChecked?: boolean
	onChange?: (checked: boolean) => void
}

const Checkbox: FC<CheckboxProps> = ({
	subLabel = '',
	label = '',
	name,
	className = '',
	defaultChecked,
	onChange,
}) => {
	return (
		<div className={`flex text-sm sm:text-base ${className}`}>
			<input
				id={name}
				name={name}
				type="checkbox"
				className="focus:ring-action-primary h-5 w-5 rounded border-neutral-400 bg-white text-primary-500 hover:border-neutral-900 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-700 dark:checked:bg-primary-500 dark:hover:border-neutral-400 sm:h-6 sm:w-6"
				defaultChecked={defaultChecked}
				onChange={(e) => onChange && onChange(e.target.checked)}
			/>
			{label && (
				<label
					htmlFor={name}
					className="ms-2 flex flex-1 flex-col justify-center sm:ms-3.5"
				>
					<span className="text-neutral-900 dark:text-neutral-300">
						{label}
					</span>
					{subLabel && (
						<p className="mt-1 text-sm font-light text-neutral-500 dark:text-neutral-400">
							{subLabel}
						</p>
					)}
				</label>
			)}
		</div>
	)
}

export default Checkbox
