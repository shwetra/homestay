import React, { TextareaHTMLAttributes } from 'react'

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className = '', children, ...args }, ref) => {
		return (
			<textarea
				ref={ref}
				className={`dark:focus:ring-primary-600 block w-full rounded-2xl border-neutral-200 bg-white text-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-opacity-25 ${className}`}
				rows={4}
				{...args}
			>
				{children}
			</textarea>
		)
	},
)

export default Textarea
