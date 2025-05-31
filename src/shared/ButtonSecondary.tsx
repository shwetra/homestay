'use client'

import Button, { ButtonProps } from './Button'
import React from 'react'

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
	className = ' ',
	...args
}) => {
	return (
		<Button
			className={`ttnc-ButtonSecondary border border-neutral-200 bg-white font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 ${className}`}
			{...args}
		/>
	)
}

export default ButtonSecondary
